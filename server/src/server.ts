import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import quotesRoutes from './routes/HttpRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.use('/quotes', quotesRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
