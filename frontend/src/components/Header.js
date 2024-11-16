import React from 'react';
import '../css/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="./logo.svg" alt="Цитатник" />
            </div>
            <nav className="nav-menu">
                <a href="#">Главная</a>
                <a href="#">Авторы</a>
                <a href="/search_book">Произведения</a>
                <a href="#">Герои</a>
                <a href="#">Статистика</a>
            </nav>
        </header>
    );
};

export default Header;