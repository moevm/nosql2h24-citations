import express from 'express';
import {
    getQuoteDetails,
    getAuthorDetails,
    getBookDetails,
    getHeroDetails,
} from '../controllers/quoteController';

const router = express.Router();

// @ts-ignore
router.get('/quote/:quoteId', getQuoteDetails);
// @ts-ignore
router.get('/author/:authorName', getAuthorDetails);
// @ts-ignore
router.get('/book/:bookName', getBookDetails);
// @ts-ignore
router.get('/hero/:heroName', getHeroDetails);

export default router;
