import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getBooks = async (req: Request, res: Response) => {
    const {
        keyword,
        authorNames,
        authorPartial,
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

    createPartialMatch(authorPartial as string, "authorName");

    if (bookYearStart || bookYearEnd) {
        filter['book.year'] = {};
        if (bookYearStart) filter['book.year'].$gte = parseInt(bookYearStart as string);
        if (bookYearEnd) filter['book.year'].$lte = parseInt(bookYearEnd as string);
    }

    if (keyword) {
        filter['book.name'] = new RegExp(keyword as string, 'i');
    }

    try {

        const books = await Quote.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: {
                        name: "$book.name",
                        year: "$book.year",
                        authorName: "$authorName"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id.name",
                    year: "$_id.year",
                    authorName: "$_id.authorName"
                }
            }
        ]);

        const totalBooks = books.length;
        const paginatedBooks = books.slice((page - 1) * pageSize, page * pageSize);

        res.json({
            data: paginatedBooks,
            page,
            pageSize,
            totalBooks,
            totalPages: Math.ceil(totalBooks / pageSize)
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err });
    }
};
