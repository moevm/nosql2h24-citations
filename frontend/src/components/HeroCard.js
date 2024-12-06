import React from 'react';
import '../css/HeroCard.css';
import {Link} from "react-router-dom";

const HeroCard = ({ authorName, book, hero }) => {

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
                <span className="book">{book.name}</span>
            </div>
        </div>
    );
};

export default HeroCard;