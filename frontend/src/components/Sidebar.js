import React from 'react';
import '../css/Sidebar.css';
import YearSlider from "./YearSlider";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h3>Произведение</h3>
            <div className="filters">
                <div className="filter">
                    <input type="checkbox" id="filter1"/>
                    <label htmlFor="filter1">Произведение</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter2"/>
                    <label htmlFor="filter2">Произведение</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter3"/>
                    <label htmlFor="filter3">Произведение</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter4"/>
                    <label htmlFor="filter4">Произведение</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter5"/>
                    <label htmlFor="filter5">Произведение</label>
                </div>
            </div>

            <h3>Автор</h3>
            <div className="filters">
                <div className="filter">
                    <input type="checkbox" id="filter1"/>
                    <label htmlFor="filter1">А. С. Пушкин</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter2"/>
                    <label htmlFor="filter2">А. С. Пушкин</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter3"/>
                    <label htmlFor="filter3">А. С. Пушкин</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter4"/>
                    <label htmlFor="filter4">А. С. Пушкин</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter5"/>
                    <label htmlFor="filter5">А. С. Пушкин</label>
                </div>
            </div>

            <YearSlider/>

            <h3>Герой</h3>
            <div className="filters">
                <div className="filter">
                    <input type="checkbox" id="filter1"/>
                    <label htmlFor="filter1">Дубровский</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter2"/>
                    <label htmlFor="filter2">Дубровский</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter3"/>
                    <label htmlFor="filter3">Дубровский</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter4"/>
                    <label htmlFor="filter4">Дубровский</label>
                </div>
                <div className="filter">
                    <input type="checkbox" id="filter5"/>
                    <label htmlFor="filter5">Дубровский</label>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;