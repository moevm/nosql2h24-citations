import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import SidebarHero from "../components/SidebarBook";
import "../css/SearchBookPage.css"
import BookCard from "../components/BookCard";

const SearchBookPage = () => {
    const [books, setBooks] = useState([]);
    const [countElements, setCountElements] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        authorName: [],
        bookYear: [],
        authorPartial: "",
    });

    useEffect(() => {
        document.title = "Произведения";
    }, []);

    const fetchHeroes = async () => {
        const queryParams = new URLSearchParams();

        if (filters.authorPartial.length) {
            queryParams.append('authorPartial', filters.authorPartial);
        }

        if (filters.authorName.length) {
            filters.authorName.forEach((author) => {
                queryParams.append('authorNames', author);
            });
        }

        if (filters.bookYear.length) {
            queryParams.append('bookYearStart', filters.bookYear[0]);
            queryParams.append('bookYearEnd', filters.bookYear[1]);
        }

        if (searchTerm) queryParams.append('keyword', searchTerm);

        queryParams.append('page', page.toString());
        queryParams.append('pageSize', '20');

        try {
            const response = await fetch(`http://localhost:3000/books/?${queryParams.toString()}`);

            if (!response.ok) {
                throw new Error('Ошибка при поиске произведений');
            }
            const data = await response.json();
            setBooks(data.data);
            setCountElements(data.totalBooks)
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchHeroes();
    }, [searchTerm, filters, page]);


    const handleSearch = (keyword) => {
        setSearchTerm(keyword);
        setPage(1);
    };

    const updateFilters = (updatedFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...updatedFilters }));
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };


    return (
        <div className="book-search-page">
            <div className="sidebar">
                <SidebarHero onFilterChange={updateFilters}/>
            </div>
            <div className="content">
                <SearchBar onSearch={handleSearch} placeholder="Поиск произведения"/>
                <span className="count-elements">Количество найденных элементов: {countElements}</span>
                <div className="books-list">
                    {books.map((book, index) => (
                        <div key={index} className="book-item">
                            <BookCard {...book}/>
                        </div>
                    ))}
                </div>
                {/*{totalPages > 1 && (*/}
                    <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
                {/*)}*/}
            </div>

        </div>
    );
};

export default SearchBookPage;