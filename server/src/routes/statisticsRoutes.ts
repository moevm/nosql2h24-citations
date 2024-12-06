import express from 'express';
import {
    getStatisticsByAuthors,
    getStatisticsByBooks,
    getStatisticsByHeroes,
    getStatisticsByYears
} from '../controllers/statisticsController';

const router = express.Router();

router.get('/authors', getStatisticsByAuthors);
router.get('/books', getStatisticsByBooks);
router.get('/heroes', getStatisticsByHeroes);
router.get('/years', getStatisticsByYears);

export default router;
