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

    if (bookYearStart || bookYearEnd) {
        filter['book.year'] = {};
        if (bookYearStart) filter['book.year'].$gte = parseInt(bookYearStart as string);
        if (bookYearEnd) filter['book.year'].$lte = parseInt(bookYearEnd as string);
    }

    if (keyword) {
        filter['book.name'] = new RegExp(keyword as string, 'i');
    }

    try {
        // const filter: any = {};
        //
        // if (authorNames) {
        //     const authorsArray = Array.isArray(authorNames) ? authorNames : [authorNames];
        //     filter.authorName = { $in: authorsArray };
        // }
        //
        // if (bookYearStart || bookYearEnd) {
        //     filter['book.year'] = {};
        //     if (bookYearStart) filter['book.year'].$gte = parseInt(bookYearStart as string);
        //     if (bookYearEnd) filter['book.year'].$lte = parseInt(bookYearEnd as string);
        // }
        //
        // if (keyword) {
        //     filter['book.name'] = new RegExp(keyword as string, 'i');
        // }

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
