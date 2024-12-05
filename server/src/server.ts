import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import quotesRoutes from './routes/quotesRoutes';
import filtersRoutes from './routes/filtersRoutes';
import authorsRoutes from "./routes/authorsRoutes";
import booksRoutes from "./routes/booksRoutes";
import heroesRoutes from "./routes/heroesRoutes";
import importExportRoutes from "./routes/importExportRoutes";
import statisticsRoutes from "./routes/statisticsRoutes";
import quoteRoutes from "./routes/quoteRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


connectToDatabase();

app.use('/quotes', quotesRoutes);
app.use('/filters', filtersRoutes);
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);
app.use('/heroes', heroesRoutes);
app.use('/data', importExportRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/details', quoteRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
