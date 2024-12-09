import React from "react";
import {Link} from "react-router-dom";
import "../css/DetailsBookCard.css"

const DetailsBookCard = ({bookName, year, heroes, author, totalQuotes}) => {

    const encodeParam = (param) => encodeURIComponent(param);


    return (
        <div className="details-book-card">
            <p className="details-book-text">{bookName}</p>
            <div className="details-book-details">
                <div className="books-container">
                    <span className="title-author">Автор произведения:</span>
                    <span>
                        <Link to={`/author/${encodeParam(author)}`} className="book-link">
                            {author}
                        </Link>
                    </span>
                </div>
                <div>
                    <span className="title-year">Год публикации:</span>
                    <span className="year">{year}</span>
                </div>

                <div className="books-container">
                    <span className="title-heroe">Герои произведения:</span>
                    <span className="heroe-list">
                        {heroes.map((hero, index) => (
                            <React.Fragment key={hero}>
                                <Link to={`/hero/${encodeParam(hero)}`} className="book-link">
                                    {hero}
                                </Link>
                                {index < heroes.length - 1 && ', '}
                            </React.Fragment>
                        ))}
                    </span>
                </div>

                <div>
                    <span className="title-count">Количество цитат:</span>
                    <span className="book-count">{totalQuotes}</span>
                </div>
            </div>
        </div>
    );
};

export default DetailsBookCard;