import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import CitationCard from "../components/CitationCard";
import "../css/MainPage.css"

const MainPage = () => {
        const [quotes, setQuotes] = useState([]);

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

        return (
            <div className="main-content">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="content">
                    <SearchBar/>
                    {quotes.map((quote, index) => (
                        <CitationCard key={index} {...quote} />
                    ))}
                </div>
            </div>
        )
    }
;

export default MainPage;