import express from 'express';
import { getAuthors } from '../controllers/authorsController';

const router = express.Router();

router.get('/', getAuthors);

export default router;
