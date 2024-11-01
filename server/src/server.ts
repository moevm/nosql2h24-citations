import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import quotesRoutes from './routes/HttpRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://example.com', 'http://another-domain.com'], // Указывайте разрешенные домены
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


connectToDatabase();

app.use('/quotes', quotesRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
