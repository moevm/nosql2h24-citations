import { Request, Response } from 'express';
import Quote from '../models/Quote';

export const getUniqueBooks = async (req: Request, res: Response) => {
    try {
        const books = await Quote.distinct('book.name');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};

export const getUniqueAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await Quote.distinct('authorName');
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching authors', error });
    }
};

export const getYearRange = async (req: Request, res: Response) => {
    try {
        const minYear = await Quote.find().sort({ 'book.year': 1 }).limit(1).select('book.year');
        const maxYear = await Quote.find().sort({ 'book.year': -1 }).limit(1).select('book.year');

        res.json({
            minYear: minYear[0]?.book?.year || null,
            maxYear: maxYear[0]?.book?.year || null
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching year range', error });
    }
};

export const getUniqueHeroes = async (req: Request, res: Response) => {
    try {
        const heroes = await Quote.distinct('hero');
        res.json(heroes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching heroes', error });
    }
};
