import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import quotesRoutes from './routes/quotesRoutes';
import filtersRoutes from './routes/filtersRoutes';
import heroesRoutes from "./routes/heroesRoutes";
import booksRoutes from "./routes/booksRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


connectToDatabase();

app.use('/quotes', quotesRoutes);
app.use('/filters', filtersRoutes);
app.use('/heroes', heroesRoutes);
app.use('/books', booksRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
