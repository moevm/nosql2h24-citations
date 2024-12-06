import React from 'react';
import '../css/CitationCard.css';
import {Link} from "react-router-dom";

const CitationCard = ({ id, quote, authorName, book, hero }) => {

    const encodeParam = (param) => encodeURIComponent(param);

    return (
        <div className="citation-card">
            <p className="citation-text">
                <Link to={`/quote/${id}`} className="citation-link">
                    {quote}
                </Link>
            </p>
            <div className="citation-details">
                <span className="hero">
                    ©{' '}
                    {hero ? (
                        <Link to={`/hero/${encodeParam(hero)}`} className="citation-link">
                            {hero}
                        </Link>
                    ) : (
                        "Слова автора"
                    )}
                </span>
                <span className="book">
                    <Link to={`/book/${encodeParam(book.name)}`} className="citation-link">
                        {book.name}
                    </Link>
                </span>
                <span className="book_year">{book.year} г</span>
                <span className="author">
                    <Link to={`/author/${encodeParam(authorName)}`} className="citation-link">
                        {authorName}
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default CitationCard;