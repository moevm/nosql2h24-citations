import React from 'react';
import '../css/CitationCard.css';

const CitationCard = ({ quote, authorName, book, hero }) => {
    return (
        <div className="citation-card">
            <p className="citation-text">{quote}</p>
            <div className="citation-details">
                <span className="hero">© {hero || "Слова автора"}</span>
                <span className="book">{book.name}</span>
                <span className="book_year">{book.year} г</span>
                <span className="author">{authorName}</span>
            </div>
        </div>
    );
};

export default CitationCard;