import mongoose, { Document, Schema } from 'mongoose';

interface IQuote extends Document {
    quote: string;
    authorName: string;
    book: {
        name: string;
        year: number;
    };
    hero: string;
}

const QuoteSchema: Schema = new Schema({
    quote: { type: String, required: true },
    authorName: { type: String, required: true },
    book: {
        name: { type: String, required: true },
        year: { type: Number, required: true }
    },
    hero: { type: String, required: false }
});

export default mongoose.model<IQuote>('Quote', QuoteSchema);
