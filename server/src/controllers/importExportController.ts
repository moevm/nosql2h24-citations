import Joi from 'joi';
import { Request, Response } from 'express';
import Quote from '../models/Quote';
import fs from 'fs';
import path from 'path';

const quoteSchema = Joi.object({
    authorName: Joi.string().required(),
    book: Joi.object({
        name: Joi.string().required(),
        year: Joi.number().integer().required()
    }).required(),
    hero: Joi.string().optional(),
    quote: Joi.string().required()
});

const validateQuotes = (quotes: any[]) => {
    return quotes.map((quote, index) => {
        const { error } = quoteSchema.validate(quote, { abortEarly: false });
        if (error) {
            return { index, error: error.details };
        }
        return null;
    }).filter(result => result !== null);
};

export const importQuotes = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'Файл не был загружен' });
            return;
        }

        const filePath = req.file.path;
        const fileData = fs.readFileSync(filePath, 'utf-8');

        const quotes = JSON.parse(fileData);

        if (!Array.isArray(quotes)) {
            res.status(400).json({ message: 'Некорректный формат файла: ожидается массив объектов' });
            return;
        }

        const validationErrors = validateQuotes(quotes);
        if (validationErrors.length > 0) {
            res.status(400).json({ message: 'Некорректный формат данных', errors: validationErrors });
            return;
        }

        await Quote.insertMany(quotes);

        fs.unlinkSync(filePath);

        res.json({ message: 'Цитаты успешно импортированы', count: quotes.length });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при импорте цитат', error });
    }
};

export const exportQuotes = async (req: Request, res: Response) => {
    try {
        const quotes = await Quote.find();

        const tempDir = path.join(__dirname, '../../temp');
        const filePath = path.join(tempDir, 'quotes.json');

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2), 'utf-8');

        res.download(filePath, 'quotes.json', (err) => {
            if (err) {
                console.error('Ошибка при отправке файла:', err);
                res.status(500).json({ message: 'Ошибка при экспорте цитат' });
            }

            fs.unlinkSync(filePath);
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при экспорте цитат', error });
    }
};
