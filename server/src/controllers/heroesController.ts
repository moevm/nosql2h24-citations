import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getHeroes = async (req: Request, res: Response) => {
    const { authorNames, bookNames, keyword } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
        const filter: any = {hero: {$ne: null}};

        if (authorNames) {
            const authorsArray = Array.isArray(authorNames) ? authorNames : [authorNames];
            filter.authorName = { $in: authorsArray };
        }

        if (bookNames) {
            const booksArray = Array.isArray(bookNames) ? bookNames : [bookNames];
            filter['book.name'] = { $in: booksArray };
        }

        if (keyword) {
            filter.hero = new RegExp(keyword as string, 'i');
        }

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
        res.json(heroes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching heroes', error: err });
    }
};
