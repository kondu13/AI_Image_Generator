import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async(req, res)=>{
    res.send('Hello from DALL-E!');
})

const PORT = process.env.PORT || 8080;

const startServer=()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT, '0.0.0.0', ()=>{
            console.log('Server has started on port http://localhost:8080');
        })
    }
    catch(error){
        console.log(error)
    }
    
}

startServer();
