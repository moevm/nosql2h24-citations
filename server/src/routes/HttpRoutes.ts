import express from 'express';
import { getQuotes, searchQuotes, filterQuotes } from '../controllers/mainPageController';

const router = express.Router();

router.get('/', getQuotes);                // Главная страница с цитатами
router.get('/search', searchQuotes);       // Поиск по ключевому слову
router.get('/filter', filterQuotes);       // Фильтрация цитат

export default router;
