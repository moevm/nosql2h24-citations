import React from 'react';
import '../css/HeroCard.css';
import {Link} from "react-router-dom";

const HeroCard = ({authorName, book, hero}) => {

    const encodeParam = (param) => encodeURIComponent(param);


    return (
        <div className="hero-card">
            <p className="hero-text">{hero}</p>
            <div className="hero-details">
                <span className="author">
                    <Link to={`/author/${encodeParam(authorName)}`} className="link">
                            {authorName}
                    </Link>
                </span>
                <span className="book">
                    <Link to={`/book/${encodeParam(book.name)}`} className="link">
                            {book.name}
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default HeroCard;