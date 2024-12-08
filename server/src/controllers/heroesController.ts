import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getHeroes = async (req: Request, res: Response) => {
    const {
        keyword,
        authorNames,
        authorPartial,
        bookNames,
        bookPartial,
        bookYearStart,
        bookYearEnd
    } = req.query;

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const filter: any = {};

    const createExactMatch = (values: string | string[] | undefined, fieldName: string) => {
        if (!values) return;

        const arrayValues = Array.isArray(values) ? values : [values];
        filter[fieldName] = { $in: arrayValues };
    };

    const createPartialMatch = (value: string | undefined, fieldName: string) => {
        if (!value) return;

        filter[fieldName] = new RegExp(value, "i");
    };

    createExactMatch(authorNames as string | string[], "authorName");
    createExactMatch(bookNames as string | string[], "book.name");

    createPartialMatch(authorPartial as string, "authorName");
    createPartialMatch(bookPartial as string, "book.name");

    if (bookYearStart || bookYearEnd) {
        filter['book.year'] = {};
        if (bookYearStart) filter['book.year'].$gte = parseInt(bookYearStart as string);
        if (bookYearEnd) filter['book.year'].$lte = parseInt(bookYearEnd as string);
    }

    if (keyword) {
        filter.hero = new RegExp(keyword as string, 'i');
    }

    try {

        const heroes = await Quote.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: {
                        hero: "$hero",
                        bookName: "$book.name",
                        bookYear: "$book.year",
                        authorName: "$authorName"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    hero: "$_id.hero",
                    book: {
                        name: "$_id.bookName",
                        year: "$_id.bookYear"
                    },
                    authorName: "$_id.authorName"
                }
            }
        ]);

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
