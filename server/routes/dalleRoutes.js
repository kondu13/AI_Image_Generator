import express from 'express';
import * as dotenv from 'dotenv';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

router.route('/').post(async (req, res) => {
    const endpoint = process.env.ENDPOINT;
    const azureApiKey = process.env.OPENAI_API_KEY;

    const {prompt} = req.body;
    const size = '1024x1024';
    const n = 1;

    try {
        console.log("== Batch Image Generation ==");

        const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
        const deploymentName = "dalle-e-3";
        const results = await client.getImages(deploymentName, prompt, { n, size });

        const imageUrl = results.data[0].url;
        
        // Send response to client
        res.json({ imageUrl });
    } catch (err) {
        console.error("Error generating images:", err);
        res.status(500).json({ error: "Error generating images" });
    }
});

export default router;
