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


        useEffect(() => {
            const fetchQuotes = async () => {
                try {
                    const response = await fetch('http://localhost:3000/quotes');
                    if (!response.ok) {
                        throw new Error('Ошибка при получении цитат');
                    }
                    const data = await response.json();
                    setQuotes(data);
                } catch (error) {
                    console.error(error.message);
                }
            };

            fetchQuotes();
        }, []);

        const handleSearch = async (keyword) => {
            setSearchTerm(keyword);

            if (keyword === '') {
                const response = await fetch('http://localhost:3000/quotes');
                const data = await response.json();
                setQuotes(data);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/quotes/search?keyword=${keyword}`);
                if (!response.ok) {
                    throw new Error('Ошибка при поиске цитат');
                }
                const data = await response.json();
                setQuotes(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        useEffect(() => {
            const fetchFilteredQuotes = async () => {
                const queryParams = new URLSearchParams();

                if (filters.authorName.length) queryParams.append('authorName', filters.authorName.join(','));
                if (filters.bookName.length) queryParams.append('bookName', filters.bookName.join(','));
                if (filters.bookYear) {
                    queryParams.append('bookYearStart', filters.bookYear[0]);
                    queryParams.append('bookYearEnd', filters.bookYear[1]);
                }
                if (filters.heroName.length) queryParams.append('heroName', filters.heroName.join(','));

                try {
                    const response = await fetch(`http://localhost:3000/quotes/filter?${queryParams.toString()}`);
                    if (!response.ok) {
                        throw new Error('Ошибка при фильтрации цитат');
                    }
                    const data = await response.json();
                    setQuotes(data);
                } catch (error) {
                    console.error(error.message);
                }
            };

            fetchFilteredQuotes();
        }, [filters]);

        const updateFilters = (updatedFilters) => {
            setFilters((prevFilters) => ({...prevFilters, ...updatedFilters}));
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