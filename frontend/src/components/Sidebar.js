import React, {useEffect, useState} from 'react';
import '../css/Sidebar.css';
import YearSlider from "./YearSlider";

const Sidebar = ({ onFilterChange })  => {
    const [authors, setAuthors] = useState([]);
    const [books, setBooks] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedHeroes, setSelectedHeroes] = useState([]);
    const [yearRange, setYearRange] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const authorsResponse = await fetch('http://localhost:3000/filters/authors');
                const authorsData = await authorsResponse.json();
                setAuthors(authorsData);

                const booksResponse = await fetch('http://localhost:3000/filters/books');
                const booksData = await booksResponse.json();
                setBooks(booksData);

                const heroesResponse = await fetch('http://localhost:3000/filters/heroes');
                const heroesData = await heroesResponse.json();
                setHeroes(heroesData);

                const yearsResponse = await fetch('http://localhost:3000/filters/years');
                const yearsData = await yearsResponse.json();
                setYearRange([yearsData.minYear, yearsData.maxYear]);
            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };

        fetchFilters();
    }, []);

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
                {books.map((book, index) => (
                    <div className="filter" key={index}>
                        <input
                            type="checkbox"
                            id={`book-${index}`}
                            onChange={() => handleCheckboxChange('bookName', book)}
                        />
                        <label htmlFor={`book-${index}`}>{book}</label>
                    </div>
                ))}
            </div>

            <h3>Автор</h3>
            <div className="filters">
                {authors.map((author, index) => (
                    <div className="filter" key={index}>
                        <input
                            type="checkbox"
                            id={`author-${index}`}
                            onChange={() => handleCheckboxChange('authorName', author)}
                        />
                        <label htmlFor={`author-${index}`}>{author}</label>
                    </div>
                ))}
            </div>

            {/*<YearSlider onYearRangeChange={handleYearRangeChange} initialRange={yearRange} />*/}

            <h3>Герой</h3>
            <div className="filters">
                {heroes.map((hero, index) => (
                    <div className="filter" key={index}>
                        <input
                            type="checkbox"
                            id={`hero-${index}`}
                            onChange={() => handleCheckboxChange('heroName', hero)}
                        />
                        <label htmlFor={`hero-${index}`}>{hero}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;