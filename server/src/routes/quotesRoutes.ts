import express from 'express';
import { getQuotes, searchQuotes, filterQuotes } from '../controllers/quotesController';

const router = express.Router();

router.get('/', getQuotes);
router.get('/search', searchQuotes);
router.get('/filter', filterQuotes);

export default router;
