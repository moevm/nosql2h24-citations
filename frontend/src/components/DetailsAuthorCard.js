import {Link} from "react-router-dom";
import React from "react";
import "../css/DetailsAuthorCard.css"

const DetailsAuthorCard = ({authorName, books, totalQuotes}) => {

    const encodeParam = (param) => encodeURIComponent(param);


    return (
        <div className="details-author-card">
            <p className="details-author-text">{authorName}</p>
            <div className="details-author-details">
                <div className="books-container">
                    <span className="title-book">Произведения:</span>
                    <span className="book-list">
                        {books.map((book, index) => (
                            <React.Fragment key={`${book.name}-${book.year}`}>
                                <Link to={`/book/${encodeParam(book.name)}`} className="author-link">
                                    {book.name}
                                </Link>
                                {index < books.length - 1 && ', '}
                            </React.Fragment>
                        ))}
                    </span>
                </div>
                <div>
                    <span className="title-count">Количество цитат:</span>
                    <span className="count">{totalQuotes}</span>
                </div>
            </div>
        </div>
    );
};

export default DetailsAuthorCard;