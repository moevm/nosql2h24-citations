import React, {useEffect, useState} from 'react';
import '../css/Sidebar.css';
import YearSlider from "./YearSlider";
import {faChevronDown, faChevronUp, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";

const Sidebar = ({ onFilterChange }) => {
    const [authors, setAuthors] = useState([]);
    const [books, setBooks] = useState([]);
    const [heroes, setHeroes] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedHeroes, setSelectedHeroes] = useState([]);
    const [yearRange, setYearRange] = useState([]);

    const [authorSearch, setAuthorSearch] = useState("");
    const [bookSearch, setBookSearch] = useState("");
    const [heroSearch, setHeroSearch] = useState("");

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
                const authorsResponse = await fetch(`${process.env.REACT_APP_API_URL}/filters/authors`);
                const authorsData = await authorsResponse.json();
                setAuthors(authorsData);

                const booksResponse = await fetch(`${process.env.REACT_APP_API_URL}/filters/books`);
                const booksData = await booksResponse.json();
                setBooks(booksData);

                const heroesResponse = await fetch(`${process.env.REACT_APP_API_URL}/filters/heroes`);
                const heroesData = await heroesResponse.json();
                setHeroes(heroesData);

                const yearsResponse = await fetch(`${process.env.REACT_APP_API_URL}/filters/years`);
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
                onFilterChange({authorName: updatedSelection});
                break;
            case 'bookName':
                updatedSelection = toggleSelection(selectedBooks, value);
                setSelectedBooks(updatedSelection);
                onFilterChange({bookName: updatedSelection});
                break;
            case 'heroName':
                updatedSelection = toggleSelection(selectedHeroes, value);
                setSelectedHeroes(updatedSelection);
                onFilterChange({heroName: updatedSelection});
                break;
            default:
                break;
        }
    };

    const toggleSelection = (array, value) => {
        return array.includes(value) ? array.filter(item => item !== value) : [...array, value];
    };

    const handleSearchChange = (category, value) => {
        if (category === 'author') {
            setAuthorSearch(value);
            onFilterChange({
                authorPartial: value,
            });
        } else if (category === 'book') {
            setBookSearch(value);
            onFilterChange({
                bookPartial: value,
            });
        } else if (category === 'hero') {
            setHeroSearch(value);
            onFilterChange({
                heroPartial: value,
            });
        }
    };

    const handleYearRangeChange = (newRange) => {
        // setYearRange(newRange);
        onFilterChange({bookYear: newRange});
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
                <SearchBar placeholder="Поиск по произведению" onSearch={(value) => handleSearchChange('book', value)} />
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
                        {books.length > defaultDisplayCount && displayCount.books === defaultDisplayCount && (
                            <button onClick={() => handleShowMore('books')} className="show-more">
                                <FontAwesomeIcon icon={faPlus} /> Показать все
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="filter-section">
                <SearchBar placeholder="Поиск по автору" onSearch={(value) => handleSearchChange('author', value)} />
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
                        {authors.length > defaultDisplayCount && displayCount.authors === defaultDisplayCount && (
                            <button onClick={() => handleShowMore('authors')} className="show-more">
                                <FontAwesomeIcon icon={faPlus} /> Показать все
                            </button>
                        )}
                    </div>
                )}
            </div>

            <YearSlider onYearRangeChange={handleYearRangeChange} initialRange={yearRange} />

            <div className="filter-section">
                <SearchBar placeholder="Поиск по герою" onSearch={(value) => handleSearchChange('hero', value)} />
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
                        {heroes.length > defaultDisplayCount && displayCount.heroes === defaultDisplayCount && (
                            <button onClick={() => handleShowMore('heroes')} className="show-more">
                                <FontAwesomeIcon icon={faPlus} /> Показать все
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;