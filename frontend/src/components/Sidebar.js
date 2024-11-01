import React, {useState} from 'react';
import '../css/Sidebar.css';
import YearSlider from "./YearSlider";

const Sidebar = ({ onFilterChange })  => {
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedHeroes, setSelectedHeroes] = useState([]);
    const [yearRange, setYearRange] = useState([1800, 2024]);

    const handleCheckboxChange = (category, value) => {
        let updatedSelection;

        switch (category) {
            case 'authorName':
                updatedSelection = toggleSelection(selectedAuthors, value);
                setSelectedAuthors(updatedSelection);
                onFilterChange({ authorName: updatedSelection });
                break;
            case 'bookName':
                updatedSelection = toggleSelection(selectedBooks, value);
                setSelectedBooks(updatedSelection);
                onFilterChange({ bookName: updatedSelection });
                break;
            case 'heroName':
                updatedSelection = toggleSelection(selectedHeroes, value);
                setSelectedHeroes(updatedSelection);
                onFilterChange({ heroName: updatedSelection });
                break;
            default:
                break;
        }
    };

    const toggleSelection = (array, value) => {
        return array.includes(value) ? array.filter(item => item !== value) : [...array, value];
    };

    const handleYearRangeChange = (newRange) => {
        setYearRange(newRange);
        onFilterChange({ bookYear: newRange });
    };



    return (
        <div className="sidebar">
            <h3>Произведение</h3>
            <div className="filters">
                <div className="filter">
                    <input
                        type="checkbox"
                        id="book1"
                        onChange={() => handleCheckboxChange('bookName', 'Дубровский')}
                    />
                    <label htmlFor="book1">Дубровский</label>
                </div>
            </div>

            <h3>Автор</h3>
            <div className="filters">
                <div className="filter">
                    <input
                        type="checkbox"
                        id="author1"
                        onChange={() => handleCheckboxChange('authorName', 'Александр Сергеевич Пушкин')}
                    />
                    <label htmlFor="author1">Александр Сергеевич Пушкин</label>
                </div>
            </div>

            <YearSlider onYearRangeChange={handleYearRangeChange}/>

            <h3>Герой</h3>
            <div className="filters">
                <div className="filter">
                    <input
                        type="checkbox"
                        id="hero1"
                        onChange={() => handleCheckboxChange('heroName', 'Дубровский')}
                    />
                    <label htmlFor="hero1">Дубровский</label>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;