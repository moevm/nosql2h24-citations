import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getBooks = async (req: Request, res: Response) => {
    const { authorNames, bookYearStart, bookYearEnd, keyword } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
        const filter: any = {};

        if (authorNames) {
            const authorsArray = Array.isArray(authorNames) ? authorNames : [authorNames];
            filter.authorName = { $in: authorsArray };
        }

        if (bookYearStart || bookYearEnd) {
            filter['book.year'] = {};
            if (bookYearStart) filter['book.year'].$gte = parseInt(bookYearStart as string);
            if (bookYearEnd) filter['book.year'].$lte = parseInt(bookYearEnd as string);
        }

        if (keyword) {
            filter['book.name'] = new RegExp(keyword as string, 'i');
        }

        const books = await Quote.distinct('book.name', filter);

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
