import AWS from 'aws-sdk';

/* Function to enable AWS S3 configurations and load file to S3*/
export async function uploadToS3(file: File){
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
        });

        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            region: 'us-east-2',
        });

        const file_key = 'uploads/' + Date.now().toString() + file.name.replace(' ', '-');

        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
            Body: file,
        };

        const upload = s3.putObject(params).on('httpUploadProgress', evt =>{
            console.log('Uploading to S3...', parseInt(((evt.loaded * 100) / evt.total).toString())+ '%');
        }).promise();

        await upload.then(data => {
            console.log('Successfully uploaded to S3!', file_key);
        });

        return Promise.resolve({
            file_key,
            file_name: file.name,
        });

    } catch (error) {
        
    }
}

//Function to return S3 URL of PDF to embed into the Chat screen
export function getS3URL(file_key: string){
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${file_key}`;

    return url;
};