import React from 'react';
import '../css/HeroCard.css';

const HeroCard = ({ authorName, book, hero }) => {
    return (
        <div className="hero-card">
            <p className="hero-text">{hero}</p>
            <div className="hero-details">
                <span className="author">{authorName}</span>
                <span className="book">{book.name}</span>
            </div>
        </div>
    );
};

export default HeroCard;