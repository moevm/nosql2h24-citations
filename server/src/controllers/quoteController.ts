import { Request, Response } from 'express';
import Quote from '../models/Quote';
import mongoose from "mongoose";

export const getQuoteDetails = async (req: Request, res: Response): Promise<Response> => {
    const { quoteId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageLimit = parseInt(req.query.pageLimit as string) || 10;
    console.log(quoteId);

    if (!mongoose.Types.ObjectId.isValid(quoteId)) {
        return res.status(400).json({ message: 'Invalid quote ID' });
    }

    try {
        const quote = await Quote.findById(quoteId).exec();
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        const otherQuotesByAuthor = await Quote.find({
            authorName: quote.authorName,
            _id: { $ne: quote._id }
        })
            .skip((page - 1) * pageLimit)
            .limit(pageLimit)
            .exec();

        const totalQuotes = await Quote.countDocuments({
            authorName: quote.authorName,
            _id: { $ne: quote._id }
        });

        const totalPages = Math.ceil(totalQuotes / pageLimit);

        return res.json({
            quote,
            otherQuotesByAuthor,
            page,
            totalPages,
            totalQuotes
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching quote', error: err });
    }
};


export const getAuthorDetails = async (req: Request, res: Response): Promise<Response> => {
    const { authorName } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageLimit = parseInt(req.query.pageLimit as string) || 10;

    try {
        const quotes = await Quote.find({ authorName }).exec();

        if (quotes.length === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const books = quotes.map((quote) => ({
            name: quote.book.name,
            year: quote.book.year
        }));

        const uniqueBooks = Array.from(
            new Map(books.map(book => [`${book.name}-${book.year}`, book])).values()
        );

        const heroes = Array.from(new Set(quotes.map(quote => quote.hero))).filter(hero => hero);


        const authorQuotes = await Quote.find({ authorName })
            .skip((page - 1) * pageLimit)
            .limit(pageLimit)
            .exec();

        const totalQuotes = await Quote.countDocuments({ authorName });
        const totalPages = Math.ceil(totalQuotes / pageLimit);

        return res.json({
            authorName,
            books: uniqueBooks,
            quotes: authorQuotes,
            heroes,
            page,
            totalPages,
            totalQuotes
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching author details', error: err });
    }
};


export const getBookDetails = async (req: Request, res: Response): Promise<Response> => {
    const { bookName } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageLimit = parseInt(req.query.pageLimit as string) || 10;

    try {
        const allQuotesByBook = await Quote.find({ 'book.name': bookName }).exec();
        if (allQuotesByBook.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const { authorName, book } = allQuotesByBook[0];

        const heroes = [...new Set(allQuotesByBook.map((quote) => quote.hero).filter((hero) => hero))];

        const quotesByBook = await Quote.find({ 'book.name': bookName })
            .skip((page - 1) * pageLimit)
            .limit(pageLimit)
            .exec();

        const totalQuotes = allQuotesByBook.length;
        const totalPages = Math.ceil(totalQuotes / pageLimit);

        return res.json({
            bookName,
            year: book.year,
            author: authorName,
            heroes,
            quotes: quotesByBook,
            page,
            totalPages,
            totalQuotes,
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching book details', error: err });
    }
};

export const getHeroDetails = async (req: Request, res: Response): Promise<Response> => {
    const { heroName } = req.params;
    const heroPage = parseInt(req.query.page as string) || 1;
    const heroPageLimit = parseInt(req.query.pageLimit as string) || 10;
    const bookPage = parseInt(req.query.page as string) || 1;
    const bookPageLimit = parseInt(req.query.pageLimit as string) || 10;

    try {
        const quotes = await Quote.find({ hero: heroName }).exec();

        if (quotes.length === 0) {
            return res.status(404).json({ message: 'Hero not found' });
        }

        const books = quotes.map((quote) => ({
            name: quote.book.name,
            year: quote.book.year
        }));
        const authors = [...new Set(quotes.map((quote) => quote.authorName))];

        const uniqueBooks = Array.from(
            new Map(books.map(book => [`${book.name}-${book.year}`, book])).values()
        );

        const heroQuotes = await Quote.find({ hero: heroName })
            .skip((heroPage - 1) * heroPageLimit)
            .limit(heroPageLimit)
            .exec();

        const bookName = quotes[0].book.name;

        const quotesFromBook = await Quote.find({ 'book.name': bookName })
            .skip((bookPage - 1) * bookPageLimit)
            .limit(bookPageLimit)
            .exec();

        const totalQuotesInBook = await Quote.countDocuments({ 'book.name': bookName }).exec();
        const totalPagesInBook = Math.ceil(totalQuotesInBook / heroPageLimit);

        const totalQuotesByHero = quotes.length;
        const totalPagesByHero = Math.ceil(totalQuotesByHero / bookPageLimit);

        return res.json({
            heroName,
            books: uniqueBooks,
            authors,
            quotes: heroQuotes,
            quotesFromBook,
            heroPage,
            bookPage,
            totalPagesByHero,
            totalQuotesByHero,
            totalPagesInBook,
            totalQuotesInBook
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching hero details', error: err });
    }
};

