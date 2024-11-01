import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getQuotes = async (req: Request, res: Response) => {
    const pageLimit = parseInt(req.query.pageLimit as string) || 10;
    try {
        const quotes = await Quote.find().limit(pageLimit).exec();
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quotes', error: err });
    }
};

export const searchQuotes = async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;
    try {
        const quotes = await Quote.find({ quote: new RegExp(keyword, 'i') }).exec();
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ message: 'Error searching quotes', error: err });
    }
};

export const filterQuotes = async (req: Request, res: Response) => {
    const { authorName, bookName, bookYear, heroName } = req.query;
    const filter: any = {
        ...(authorName && { authorName }),
        ...(bookName && { 'book.name': bookName }),
        ...(bookYear && { 'book.year': parseInt(bookYear as string) }),
        ...(heroName && { heroName })
    };
    try {
        const quotes = await Quote.find(filter).exec();
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ message: 'Error filtering quotes', error: err });
    }
};
