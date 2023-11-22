import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";

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

}