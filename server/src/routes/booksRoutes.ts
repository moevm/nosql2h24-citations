import express from 'express';
import { getBooks } from '../controllers/booksController';

const router = express.Router();

router.get('/', getBooks);

export default router;
