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

    const createMatch = (
        values: string | string[] | undefined,
        isPartial: boolean | undefined,
        fieldName: string
    ) => {
        if (!values) return;

        const arrayValues = Array.isArray(values) ? values : [values];
        if (isPartial) {
            filter[fieldName] = {
                $in: arrayValues.map(value => new RegExp(value, "i"))
            };
        } else {
            filter[fieldName] = { $in: arrayValues };
        }
    };

    createMatch(authorNames as string | string[], authorPartial === "true", "authorName");

    createMatch(bookNames as string | string[], bookPartial === "true", "book.name");

    createMatch(heroes as string | string[], heroPartial === "true", "hero");

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
