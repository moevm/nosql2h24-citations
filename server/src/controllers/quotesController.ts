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
    const {
        keyword,
        authorNames,
        authorPartial,
        bookNames,
        bookPartial,
        heroes,
        heroPartial,
        bookYearStart,
        bookYearEnd
    } = req.query;

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const filter: any = {};

    const createExactMatch = (values: string | string[] | undefined, fieldName: string) => {
        if (values) {
            const arrayValues = Array.isArray(values) ? values : [values];
            filter[fieldName] = { ...filter[fieldName], $in: arrayValues };
        }
    };

    const createPartialMatch = (value: string | undefined, fieldName: string) => {
        if (value) {
            const regex = new RegExp(value, "i");
            filter[fieldName] = { ...filter[fieldName], $regex: regex };
        }
    };

    createExactMatch(authorNames as string | string[], "authorName");
    createExactMatch(bookNames as string | string[], "book.name");
    createExactMatch(heroes as string | string[], "hero");

    createPartialMatch(authorPartial as string, "authorName");
    createPartialMatch(bookPartial as string, "book.name");
    createPartialMatch(heroPartial as string, "hero");

    if (bookYearStart || bookYearEnd) {
        filter['book.year'] = {};
        if (bookYearStart) filter['book.year'].$gte = parseInt(bookYearStart as string);
        if (bookYearEnd) filter['book.year'].$lte = parseInt(bookYearEnd as string);
    }

    if (keyword) {
        const escapedKeyword = keyword
            .toString()
            .replace(/[.*+?^${}(),!;:"'|[\]\\\-]/g, '');

        const pattern = escapedKeyword
            .split(/\s+/)
            .map(word => word.replace(/\s/g, ''))
            .join('[^a-zA-Zа-яА-Я]*');

        filter.quote = new RegExp(pattern, 'i');
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
