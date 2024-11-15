import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getBooks = async (req: Request, res: Response) => {
    const { authorsNames, bookYearStart, bookYearEnd, keyword } = req.query;

    try {
        const filter: any = {};

        if (authorsNames) {
            const authorsArray = Array.isArray(authorsNames) ? authorsNames : [authorsNames];
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

        console.log(filter)
        const books = await Quote.distinct('book.name', filter);

        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err });
    }
};
