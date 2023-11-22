import {Configuration, OpenAIApi} from 'openai-edge';

export const runtime = 'edge'


const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

//Endpoint for chat messages
export async function POST(req: Request){
    try {
        const {messages} = await req.json();
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages,
            stream: true,
        });
    } catch (error) {
        
    }
}