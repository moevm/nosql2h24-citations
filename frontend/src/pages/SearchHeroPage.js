import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import SidebarHero from "../components/SidebarHero";
import "../css/SearchHeroPage.css"
import HeroCard from "../components/HeroCard";

const SearchHeroPage = () => {
    const [heroes, setHeroes] = useState([]);
    const [countElements, setCountElements] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        authorName: [],
        bookName: [],
    });

    useEffect(() => {
        document.title = "Герои";
    }, []);

    const fetchHeroes = async () => {
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

        if (searchTerm) queryParams.append('keyword', searchTerm);

        queryParams.append('page', page.toString());
        queryParams.append('pageSize', '20');

        try {
            const response = await fetch(`http://localhost:3000/heroes/?${queryParams.toString()}`);

            if (!response.ok) {
                throw new Error('Ошибка при поиске авторов');
            }
            const data = await response.json();
            setHeroes(data.data);
            setCountElements(data.totalHeroes)
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
        <div className="hero-search-page">
            <div className="sidebar">
                <SidebarHero onFilterChange={updateFilters}/>
            </div>
            <div className="content">
                <SearchBar onSearch={handleSearch} placeholder="Поиск героя произведения"/>
                <span className="count-elements">Количество найденных элементов: {countElements}</span>
                <div className="heroes-list">
                    {heroes.map((hero, index) => (
                        <div key={index} className="hero-item">
                            <HeroCard {...hero}/>
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

export default SearchHeroPage;