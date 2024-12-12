import React from 'react';
import '../css/BookCard.css';
import {Link} from "react-router-dom";

const BookCard = ({  name, year, authorName, totalQuotes, totalHeroes }) => {
    const encodeParam = (param) => encodeURIComponent(param);
    return (
        <div className="book-card">
            <p className="book-text">
                <Link to={`/book/${encodeParam(name)}`} className="link">
                    {name}
                </Link>
            </p>
            <div className="book-details">
                <span className="author">
                    <Link to={`/author/${encodeParam(authorName)}`} className="link">
                            {authorName}
                    </Link>
                </span>
                <span className="year">{year} г</span>
                <span className="total-quotes">Количество цитат: {totalQuotes}</span>
                <span className="total-heroes">Количество героев: {totalHeroes}</span>
            </div>
        </div>
    );
};

export default BookCard;