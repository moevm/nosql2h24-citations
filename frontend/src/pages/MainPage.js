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
            bookYear: [1800, 2024],
            heroName: [],
        });

        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);


    const fetchFilteredAndSearchedQuotes = async () => {
        const queryParams = new URLSearchParams();

        if (filters.authorName.length) queryParams.append('authorNames', filters.authorName.join(','));
        if (filters.bookName.length) queryParams.append('bookNames', filters.bookName.join(','));
        if (filters.bookYear) {
            queryParams.append('bookYearStart', filters.bookYear[0]);
            queryParams.append('bookYearEnd', filters.bookYear[1]);
        }
        if (filters.heroName.length) queryParams.append('heroes', filters.heroName.join(','));
        if (searchTerm) queryParams.append('keyword', searchTerm);
        queryParams.append('page', page.toString());
        queryParams.append('pageSize', '10'); // Указываем размер страницы

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