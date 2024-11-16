import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getHeroes = async (req: Request, res: Response) => {
    const { authorNames, bookNames, bookYearStart, bookYearEnd, keyword } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
        const filter: any = {};

        if (authorNames) {
            const authorsArray = Array.isArray(authorNames) ? authorNames : [authorNames];
            filter.authorName = { $in: authorsArray };
        }

        if (bookNames) {
            const booksArray = Array.isArray(bookNames) ? bookNames : [bookNames];
            filter['book.name'] = { $in: booksArray };
        }

        if (bookYearStart || bookYearEnd) {
            filter['book.year'] = {};
            if (bookYearStart) filter['book.year'].$gte = parseInt(bookYearStart as string);
            if (bookYearEnd) filter['book.year'].$lte = parseInt(bookYearEnd as string);
        }

        if (keyword) {
            filter.hero = new RegExp(keyword as string, 'i');
        }

        const heroes = await Quote.distinct('hero', filter);

        const totalHeroes = heroes.length;
        const paginatedHeroes = heroes.slice((page - 1) * pageSize, page * pageSize);

        res.json({
            data: paginatedHeroes,
            page,
            pageSize,
            totalHeroes,
            totalPages: Math.ceil(totalHeroes / pageSize)
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching heroes', error: err });
    }
};
