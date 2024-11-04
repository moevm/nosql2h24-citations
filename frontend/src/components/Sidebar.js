import React, {useEffect, useState} from 'react';
import '../css/Sidebar.css';
import YearSlider from "./YearSlider";
import {faChevronDown, faChevronUp, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Sidebar = ({ onFilterChange })  => {
    const [authors, setAuthors] = useState([]);
    const [books, setBooks] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedHeroes, setSelectedHeroes] = useState([]);
    const [yearRange, setYearRange] = useState([]);

    const defaultDisplayCount = 10;
    const [displayCount, setDisplayCount] = useState({
        books: defaultDisplayCount,
        authors: defaultDisplayCount,
        heroes: defaultDisplayCount,
    });

    const [filterVisibility, setFilterVisibility] = useState({
        authors: true,
        books: true,
        heroes: true,
    });

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
        // setYearRange(newRange);
        onFilterChange({ bookYear: newRange });
    };


    const toggleFilterVisibility = (filterName) => {
        setFilterVisibility(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
        if (filterVisibility[filterName]) {
            setDisplayCount(prev => ({
                ...prev,
                [filterName]: defaultDisplayCount
            }));
        }
    };

    const handleShowMore = (category) => {
        setDisplayCount(prev => ({
            ...prev,
            [category]: prev[category] === defaultDisplayCount ? (category === 'books' ? books.length : category === 'authors' ? authors.length : heroes.length) : defaultDisplayCount
        }));
    };




    return (
        <div className="sidebar">
            <div className="filter-section">
                <h3 onClick={() => toggleFilterVisibility('books')} style={{ cursor: 'pointer' }}>
                    Произведение
                    <FontAwesomeIcon icon={filterVisibility.books ? faChevronUp : faChevronDown} className="icon" />
                </h3>
                {filterVisibility.books && (
                    <div className="filters">
                        {books.slice(0, displayCount.books).map((book, index) => (
                            <div className="filter" key={index}>
                                <input
                                    type="checkbox"
                                    id={`book-${index}`}
                                    onChange={() => handleCheckboxChange('bookName', book)}
                                    checked={selectedBooks.includes(book)}
                                />
                                <label htmlFor={`book-${index}`}>{book}</label>
                            </div>
                        ))}
                        {books.length > defaultDisplayCount && (
                            <button onClick={() => handleShowMore('books')} className="show-more">
                                <FontAwesomeIcon icon={faPlus} /> {displayCount.books === defaultDisplayCount ? 'Показать все' : 'Скрыть'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="filter-section">
                <h3 onClick={() => toggleFilterVisibility('authors')} style={{ cursor: 'pointer' }}>
                    Автор
                    <FontAwesomeIcon icon={filterVisibility.authors ? faChevronUp : faChevronDown} className="icon" />
                </h3>
                {filterVisibility.authors && (
                    <div className="filters">
                        {authors.slice(0, displayCount.authors).map((author, index) => (
                            <div className="filter" key={index}>
                                <input
                                    type="checkbox"
                                    id={`author-${index}`}
                                    onChange={() => handleCheckboxChange('authorName', author)}
                                    checked={selectedAuthors.includes(author)}
                                />
                                <label htmlFor={`author-${index}`}>{author}</label>
                            </div>
                        ))}
                        {authors.length > defaultDisplayCount && (
                            <button onClick={() => handleShowMore('authors')} className="show-more">
                                <FontAwesomeIcon icon={faPlus} /> {displayCount.authors === defaultDisplayCount ? 'Показать все' : 'Скрыть'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <YearSlider onYearRangeChange={handleYearRangeChange} initialRange={yearRange} />

            <div className="filter-section">
                <h3 onClick={() => toggleFilterVisibility('heroes')} style={{ cursor: 'pointer' }}>
                    Герой
                    <FontAwesomeIcon icon={filterVisibility.heroes ? faChevronUp : faChevronDown} className="icon" />
                </h3>
                {filterVisibility.heroes && (
                    <div className="filters">
                        {heroes.slice(0, displayCount.heroes).map((hero, index) => (
                            <div className="filter" key={index}>
                                <input
                                    type="checkbox"
                                    id={`hero-${index}`}
                                    onChange={() => handleCheckboxChange('heroName', hero)}
                                    checked={selectedHeroes.includes(hero)}
                                />
                                <label htmlFor={`hero-${index}`}>{hero}</label>
                            </div>
                        ))}
                        {heroes.length > defaultDisplayCount && (
                            <button onClick={() => handleShowMore('heroes')} className="show-more">
                                <FontAwesomeIcon icon={faPlus} /> {displayCount.heroes === defaultDisplayCount ? 'Показать все' : 'Скрыть'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;