import React from 'react';
import '../css/CitationCard.css'; // Подключаем стили

const CitationCard = () => {
    return (
        <div className="citation-card">
            <p className="citation-text">Спокойно, Маша, я - Дубровский.</p>
            <div className="citation-details">
                <span className="hero">© Дубровский</span>
                <span className="book">Дубровский</span>
                <span className="author">А.С. Пушкин</span>
            </div>
        </div>
    );
};

export default CitationCard;