import { Pinecone } from '@pinecone-database/pinecone';

//Initializing pinecone client connection
export const pinecone = new Pinecone({ 
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!
});

export async function loadS3IntoPinecone(fileKey: string){

};