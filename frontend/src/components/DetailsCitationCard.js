import React from "react";
import "../css/DetailsCitationCard.css"
import {Link} from "react-router-dom";

const DetailsCitationCard = ({quote, authorName, book, hero}) => {

    const encodeParam = (param) => encodeURIComponent(param);


    return (
        <div className="details-citation-card">
            <p className="details-citation-text">{quote}</p>
            <div className="details-citation-details">
                <div>
                    <span className="title-hero">Кому принадлежит:</span>
                    <span className="hero-d">
                        {hero ? (
                            <Link to={`/hero/${encodeParam(hero)}`} className="citation-link">
                                {hero}
                            </Link>
                        ) : (
                            "Слова автора"
                        )}
                    </span>
                </div>
                <div>
                    <span className="title-author">Автор произведения:</span>
                    <span className="author-d">
                        <Link to={`/author/${encodeParam(authorName)}`} className="citation-link">
                            {authorName}
                        </Link>
                    </span>
                </div>
                <div>
                    <span className="title-book">Произведение:</span>
                    <span className="book-d">
                        <Link to={`/book/${encodeParam(book.name)}`} className="citation-link">
                            {book.name}
                        </Link>
                    </span>
                </div>
                <div>
                    <span className="title-book_year">Год публикации:</span>
                    <span className="book_year-d">{book.year}</span>
                </div>
            </div>
        </div>
    );
};

export default DetailsCitationCard;