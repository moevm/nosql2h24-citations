import express from 'express';
import {getQuotes, filterAndSearchQuotes} from '../controllers/quotesController';

const router = express.Router();

router.get('/', getQuotes);
router.get('/search', filterAndSearchQuotes);

export default router;
