import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});




const generateImages = async () => {
    try {
        const response = await openai.images.generate({
            prompt: 'A beautiful sunset over a serene lake',
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        console.log(response.data[0].b64_json);
        // Handle the response here, e.g., extract image data and display or save it.
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

generateImages();
