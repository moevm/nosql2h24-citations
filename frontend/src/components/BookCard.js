import React from 'react';
import '../css/BookCard.css';

const BookCard = ({  name, year, authorName, }) => {
    return (
        <div className="book-card">
            <p className="book-text">{name}</p>
            <div className="book-details">
                <span className="author">{authorName}</span>
                <span className="year">{year} г</span>
            </div>
        </div>
    );
};

export default BookCard;