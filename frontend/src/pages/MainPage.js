import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import CitationCard from "../components/CitationCard";
import "../css/MainPage.css"
import Pagination from "../components/Pagination";

const MainPage = () => {
        const [quotes, setQuotes] = useState([]);
        const [countElements, setCountElements] = useState(0)
        const [searchTerm, setSearchTerm] = useState('');
        const [filters, setFilters] = useState({
            authorName: [],
            bookName: [],
            bookYear: [],
            heroName: [],
            authorPartial: "",
            bookPartial: "",
            heroPartial: ""
        });

        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);

        useEffect(() => {
            document.title = "Главная страница";
        }, []);


        const fetchFilteredAndSearchedQuotes = async () => {
            const queryParams = new URLSearchParams();

            if (filters.authorPartial.length) {
                queryParams.append('authorPartial', filters.authorPartial);
            }
            if (filters.authorName.length) {
                filters.authorName.forEach((author) => {
                    queryParams.append('authorNames', author);
                });
            }

            if (filters.bookPartial.length) {
                queryParams.append('bookPartial', filters.bookPartial);
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

            if (filters.heroPartial.length) {
                queryParams.append('heroPartial', filters.heroPartial);
            }
            if (filters.heroName.length) {
                filters.heroName.forEach((hero) => {
                    queryParams.append('heroes', hero);
                });
            }

            if (searchTerm) queryParams.append('keyword', searchTerm);
            queryParams.append('page', page.toString());
            queryParams.append('pageSize', '20');

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/quotes/search?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error('Ошибка при поиске и фильтрации цитат');
                }
                const data = await response.json();
                setQuotes(data.data);
                setCountElements(data.totalQuotes)
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
            setFilters((prevFilters) => ({...prevFilters, ...updatedFilters}));
            setPage(1);
        };
        const handlePageChange = (newPage) => {
            setPage(newPage);
        };

        return (
            <div className="main-content">
                <div className="sidebar">
                    <Sidebar onFilterChange={updateFilters}/>
                </div>
                <div className="content">
                    <SearchBar onSearch={handleSearch} placeholder="Поиск по тексту цитаты"/>
                    <span className="count-elements">Количество найденных элементов: {countElements}</span>
                    {quotes.map((quote) => (
                        <CitationCard
                            key={quote._id}
                            id={quote._id}
                            quote={quote.quote}
                            authorName={quote.authorName}
                            book={quote.book}
                            hero={quote.hero}
                        />
                    ))}
                    <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
                </div>
            </div>
        )
    }
;

export default MainPage;
