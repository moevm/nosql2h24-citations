import {Link} from "react-router-dom";
import React from "react";
import "../css/DetailsHeroCard.css"

const DetailsHeroCard = ({heroName, books, authors}) => {
    const encodeParam = (param) => encodeURIComponent(param);

    return (
        <div className="details-hero-card">
            <p className="details-hero-text">{heroName}</p>
            <div className="details-hero-details">
                <div>
                    <span className="title-hero">Герой произведения:</span>
                    <span className="hero-d">
                        <Link to={`/book/${encodeParam(books[0].name)}`} className="hero-link">
                            {books[0].name}
                        </Link>
                    </span>
                </div>
                <div>
                    <span className="title-author">Автор произведения:</span>
                    <span className="author-d">
                        <Link to={`/author/${encodeParam(authors)}`} className="hero-link">
                            {authors}
                        </Link>
                    </span>
                </div>
                <div>
                    <span className="title-book_year">Год публикации:</span>
                    <span className="book_year-d">{books[0].year} г</span>
                </div>

                {/*<div>*/}
                {/*    <span className="title-count">Количество цитат:</span>*/}
                {/*    <span className="book-count">{totalQuotesByHero}</span>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default DetailsHeroCard;