import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import {PDFLoader} from 'langchain/document_loaders/fs/pdf';
import {Document, RecursiveCharacterTextSplitter} from '@pinecone-database/doc-splitter';

//Initializing pinecone client connection
export const pinecone = new Pinecone({ 
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!
});

//Defining type for pageContent of PDF
type PDFPage = {
    pageContent: string;
    metadata: {
        loc: {pageNumber: number}
    }
}

export async function loadS3IntoPinecone(fileKey: string){

    //Downloading PDF from S3
    console.log('Downloading S3 pdf into file system.');
    const file_name = await downloadFromS3(fileKey);

    if (!file_name){
        throw new Error('Could not download from S3.');
    }

    //Reading PDF
    const loader = new PDFLoader(file_name);
    const pages = (await loader.load()) as PDFPage[];

    //Splitting PDF pages into smaller documents (vectors)



    return pages;
};

//Ensuring text does not exceed maximum bytes
export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
}

//Splitting PDF
async function prepareDocument(page: PDFPage){
    let {pageContent, metadata} = page;

    pageContent = pageContent.replace(/\n/g, '');
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000),
            }
        })
    ])
    return docs;
}