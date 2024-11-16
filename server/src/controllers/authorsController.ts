import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getAuthors = async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
        const filter: any = {};

        if (keyword) {
            filter.authorName = new RegExp(keyword, 'i');
        }

        const authors = await Quote.distinct('authorName', filter);

        const totalAuthors = authors.length;
        const paginatedAuthors = authors.slice((page - 1) * pageSize, page * pageSize);

        res.json({
            data: paginatedAuthors,
            page,
            pageSize,
            totalAuthors,
            totalPages: Math.ceil(totalAuthors / pageSize)
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching authors', error: err });
    }
};
