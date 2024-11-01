import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getQuotes = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageLimit = parseInt(req.query.pageLimit as string) || 10;

    try {
        const quotes = await Quote.find()
            .skip((page - 1) * pageLimit)
            .limit(pageLimit)
            .exec();

        const totalQuotes = await Quote.countDocuments();
        const totalPages = Math.ceil(totalQuotes / pageLimit);

        res.json({
            quotes,
            page,
            totalPages,
            totalQuotes
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quotes', error: err });
    }
};

export const filterAndSearchQuotes = async (req: Request, res: Response) => {
    const { keyword, authorNames, bookNames, heroes, bookYearStart, bookYearEnd } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const filter: any = {};

    if (authorNames) {
        const authorsArray = Array.isArray(authorNames) ? authorNames : [authorNames];
        filter.authorName = { $in: authorsArray };
    }

    if (bookNames) {
        const booksArray = Array.isArray(bookNames) ? bookNames : [bookNames];
        filter['book.name'] = { $in: booksArray };
    }

    if (heroes) {
        const heroesArray = Array.isArray(heroes) ? heroes : [heroes];
        filter.hero = { $in: heroesArray };
    }

    if (bookYearStart || bookYearEnd) {
        filter['book.year'] = {};
        if (bookYearStart) filter['book.year'].$gte = parseInt(bookYearStart as string);
        if (bookYearEnd) filter['book.year'].$lte = parseInt(bookYearEnd as string);
    }

    if (keyword) {
        filter.quote = new RegExp(keyword as string, 'i');
    }

    try {
        const quotes = await Quote.find(filter)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const totalQuotes = await Quote.countDocuments(filter).exec();
        const totalPages = Math.ceil(totalQuotes / pageSize);

        res.json({
            data: quotes,
            page,
            pageSize,
            totalQuotes,
            totalPages
        });
    } catch (err) {
        res.status(500).json({ message: 'Error searching and filtering quotes', error: err });
    }
};
