import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getAuthors = async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;

    try {
        const filter: any = {};

        if (keyword) {
            filter.authorName = new RegExp(keyword, 'i');
        }

        const authors = await Quote.distinct('authorName', filter);

        res.json(authors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching authors', error: err });
    }
};
