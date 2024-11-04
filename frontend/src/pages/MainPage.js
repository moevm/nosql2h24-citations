import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import CitationCard from "../components/CitationCard";
import "../css/MainPage.css"

const MainPage = () => {
        const [quotes, setQuotes] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [filters, setFilters] = useState({
            authorName: [],
            bookName: [],
            bookYear: [],
            heroName: [],
        });

        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);


    const fetchFilteredAndSearchedQuotes = async () => {
        const queryParams = new URLSearchParams();

        if (filters.authorName.length) {
            filters.authorName.forEach((author) => {
                queryParams.append('authorNames', author);
            });
        }
        if (filters.bookName.length) {
            filters.bookName.forEach((book) => {
                queryParams.append('bookNames', book);
            });
        }
        if (filters.bookYear.length) {
            queryParams.append('bookYearStart', filters.bookYear[0]);
            queryParams.append('bookYearEnd', filters.bookYear[1]);
        }
        if (filters.heroName.length) {
            filters.heroName.forEach((hero) => {
                queryParams.append('heroes', hero);
            });
        } 
        if (searchTerm) queryParams.append('keyword', searchTerm);
        queryParams.append('page', page.toString());
        queryParams.append('pageSize', '100');

        try {
            const response = await fetch(`http://localhost:3000/quotes/search?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error('Ошибка при поиске и фильтрации цитат');
            }
            const data = await response.json();
            setQuotes(data.data);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchFilteredAndSearchedQuotes();
    }, [searchTerm, filters, page]);

    const handleSearch = (keyword) => {
        setSearchTerm(keyword);
        setPage(1);
    };

    const updateFilters = (updatedFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...updatedFilters }));
        setPage(1);
    };

        return (
            <div className="main-content">
                <div className="sidebar">
                    <Sidebar onFilterChange={updateFilters}/>
                </div>
                <div className="content">
                    <SearchBar onSearch={handleSearch}/>
                    {quotes.map((quote, index) => (
                        <CitationCard key={index} {...quote} />
                    ))}
                </div>
            </div>
        )
    }
;

export default MainPage;