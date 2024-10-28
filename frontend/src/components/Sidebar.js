import React from 'react';
import '../css/Sidebar.css';
import YearSlider from "./YearSlider";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h3>Произведение</h3>
            <div className="filter">
                <input type="checkbox" id="filter1" />
                <label htmlFor="filter1">Произведение</label>
            </div>
            {/* Добавьте остальные чекбоксы по аналогии */}

            <h3>Автор</h3>
            <div className="filter">
                <input type="checkbox" id="author1" />
                <label htmlFor="author1">А.С. Пушкин</label>
            </div>
            {/* Добавьте остальные чекбоксы по аналогии */}

            <YearSlider/>

            <h3>Герой</h3>
            <div className="filter">
                <input type="checkbox" id="hero1" />
                <label htmlFor="hero1">Дубровский</label>
            </div>
            {/* Добавьте остальные чекбоксы по аналогии */}
        </div>
    );
};

export default Sidebar;