import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getStatisticsByAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
        const stats = await Quote.aggregate([
            { $group: { _id: '$authorName', count: { $sum: 1 } } },
            { $project: { x: '$_id', count: 1, _id: 0 } },
        ]);

        res.json({ data: stats });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении статистики по авторам', error });
    }
};

export const getStatisticsByBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const stats = await Quote.aggregate([
            { $group: { _id: '$book.name', count: { $sum: 1 } } },
            { $project: { x: '$_id', count: 1, _id: 0 } },
        ]);

        res.json({ data: stats });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении статистики по книгам', error });
    }
};

export const getStatisticsByHeroes = async (req: Request, res: Response): Promise<void> => {
    try {
        const stats = await Quote.aggregate([
            { $match: { hero: { $ne: null } } },
            { $group: { _id: '$hero', count: { $sum: 1 } } },
            { $project: { x: '$_id', count: 1, _id: 0 } },
        ]);

        res.json({ data: stats });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении статистики по героям', error });
    }
};

export const getStatisticsByYears = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookYearStart, bookYearEnd } = req.query;

        const filter: any = {};
        if (bookYearStart) filter['book.year'] = { ...filter['book.year'], $gte: parseInt(bookYearStart as string) };
        if (bookYearEnd) filter['book.year'] = { ...filter['book.year'], $lte: parseInt(bookYearEnd as string) };

        const stats = await Quote.aggregate([
            { $match: filter },
            { $group: { _id: '$book.year', count: { $sum: 1 } } },
            { $project: { x: '$_id', count: 1, _id: 0 } },
            { $sort: { x: 1 } }
        ]);

        res.json({ data: stats });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении статистики по годам', error });
    }
};
