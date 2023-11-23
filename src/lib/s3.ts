import {PutObjectCommandOutput, S3} from '@aws-sdk/client-s3';

/* Function to enable AWS S3 configurations and load file to S3*/
export async function uploadToS3(file: File):Promise<{ file_key: string; file_name: string}>{
    return new Promise((resolve, reject) => {
        try {
            
            //Initializing S3 bucket
            const s3 = new S3({
                region: 'us-east-2',
                credentials: {
                    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
                },
            });

            const file_key = "uploads/" + Date.now().toString() + file.name.replace(" ","-");

            const params = {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
                Key: file_key,
                Body: file,
            };

            s3.putObject(params, (err: any, data: PutObjectCommandOutput | undefined) => {
                return resolve({
                    file_key,
                    file_name: file.name,
                });
            });
        } catch (error) {
            reject(error);   
        }
    });
}

//Function to return S3 URL of PDF to embed into the Chat screen
export function getS3URL(file_key: string){
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${file_key}`;

    return url;
};