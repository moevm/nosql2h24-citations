import React from 'react';
import '../css/SearchBar.css';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <img className="search-icon" src="./search_icon.svg" alt="search_icon"/>
            <input
                type="text"
                placeholder="Поиск по тексту цитат"
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;