import express from 'express';
import { getUniqueBooks, getUniqueAuthors, getYearRange, getUniqueHeroes } from '../controllers/filtersController';


const router = express.Router();

router.get('/books', getUniqueBooks);

router.get('/authors', getUniqueAuthors);

router.get('/years', getYearRange);

router.get('/heroes', getUniqueHeroes);

export default router;
