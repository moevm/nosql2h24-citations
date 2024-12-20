import React, {useEffect, useState} from 'react';
import '../css/Sidebar.css';
import {faChevronDown, faChevronUp, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";

const SidebarHero = ({onFilterChange}) => {
    const [authors, setAuthors] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);

    const [authorSearch, setAuthorSearch] = useState("");
    const [bookSearch, setBookSearch] = useState("");

    const defaultDisplayCount = 10;
    const [displayCount, setDisplayCount] = useState({
        books: defaultDisplayCount,
        authors: defaultDisplayCount,
    });

    const [filterVisibility, setFilterVisibility] = useState({
        authors: true,
        books: true,
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
        }
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
        const itemsLength = category === 'books' ? books.length : category === 'authors' ? authors.length : 0;
        setDisplayCount((prev) => ({
            ...prev,
            [category]: prev[category] === defaultDisplayCount ? itemsLength : defaultDisplayCount,
        }));
    };


    return (
        <div className="sidebar">
            <div className="filter-section">
                <SearchBar placeholder="Поиск по произведению" onSearch={(value) => handleSearchChange('book', value)} />
                <h3 onClick={() => toggleFilterVisibility('books')} style={{cursor: 'pointer'}}>
                    Произведение
                    <FontAwesomeIcon icon={filterVisibility.books ? faChevronUp : faChevronDown} className="icon"/>
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
                <h3 onClick={() => toggleFilterVisibility('authors')} style={{cursor: 'pointer'}}>
                    Автор
                    <FontAwesomeIcon icon={filterVisibility.authors ? faChevronUp : faChevronDown} className="icon"/>
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
        </div>
    );
};

export default SidebarHero;