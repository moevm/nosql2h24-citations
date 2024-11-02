import React from 'react';
import '../css/CitationCard.css';

const CitationCard = ({ quote, authorName, book, heroName }) => {
    return (
        <div className="citation-card">
            <p className="citation-text">{quote}</p>
            <div className="citation-details">
                <span className="hero">© {heroName || "Слова автора"}</span>
                <span className="book">{book.name} </span>
                <span className="author">{authorName}</span>
            </div>
        </div>
    );
};

export default CitationCard;