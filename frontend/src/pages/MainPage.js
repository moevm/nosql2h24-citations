import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import CitationCard from "../components/CitationCard";
import "../css/MainPage.css"

const MainPage = () => {
        const [quotes, setQuotes] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');

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

        return (
            <div className="main-content">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="content">
                    <SearchBar onSearch={handleSearch} />
                    {quotes.map((quote, index) => (
                        <CitationCard key={index} {...quote} />
                    ))}
                </div>
            </div>
        )
    }
;

export default MainPage;