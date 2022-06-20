import express from 'express';
import cors from 'cors';
import auth from './utils/middleware/authentication.js';

const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'Origin', 'Host', 'Connection', 'Accept-Encoding', 'Accept-Language', 'Cookie'],
}));
app.use(auth());

export default app;