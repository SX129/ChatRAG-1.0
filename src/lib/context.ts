import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

//Obtaining the most similar vector embeddings from user query
export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string){
    const pinecone = new Pinecone({ 
        apiKey: process.env.PINECONE_API_KEY!,
        environment: process.env.PINECONE_ENVIRONMENT!
    });

    const index = pinecone.index('chat-rag');

    try {
        //const namespace = convertToAscii(fileKey);
        const queryResult = await index.query({
                topK: 5,
                vector: embeddings,
                includeMetadata: true,
        })

        return queryResult.matches || [];

    } catch (error) {
        console.log('Error querying embeddings.', error);
        throw error;
    }
}

//Extracting the metadata from vector embeddings
export async function getContext(query: string, fileKey: string){
    const queryEmbeddings = await getEmbeddings(query);

    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

    //Returning matches that are atleast 70% similar
    const qualifyingDocs = matches.filter(match => match.score && match.score > 0.7);

    type Metadata = {
        text: string,
        pageNumber: number,
    };

    let docs = qualifyingDocs.map(match => (match.metadata as Metadata).text);

    return docs.join('\n').substring(0,3000);
}