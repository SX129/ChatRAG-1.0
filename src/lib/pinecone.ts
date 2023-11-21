import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import {PDFLoader} from 'langchain/document_loaders/fs/pdf';

//Initializing pinecone client connection
export const pinecone = new Pinecone({ 
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!
});

export async function loadS3IntoPinecone(fileKey: string){

    //Downloading PDF from S3
    console.log('Downloading S3 pdf into file system.');
    const file_name = await downloadFromS3(fileKey);

    if (!file_name){
        throw new Error('Could not download from S3.');
    }

    //Reading PDF
    const loader = new PDFLoader(file_name);
    const pages = loader.load();
    return pages;
};