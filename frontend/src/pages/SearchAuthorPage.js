import React, { useState, useEffect } from 'react';
import "../css/SearchAuthorPage.css"
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
const SearchAuthorPage = () => {

    const encodeParam = (param) => encodeURIComponent(param);
    const [authors, setAuthors] = useState([]);
    const [countElements, setCountElements] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        document.title = "Авторы";
    }, []);

    const fetchAuthors = async () => {
        const queryParams = new URLSearchParams();

        if (searchTerm) queryParams.append('keyword', searchTerm);

        queryParams.append('page', page.toString());
        queryParams.append('pageSize', '20');

        try {
            const response = await fetch(`http://localhost:3000/authors/?${queryParams.toString()}`);

            if (!response.ok) {
                throw new Error('Ошибка при поиске авторов');
            }
            const data = await response.json();
            setAuthors(data.data);
            setCountElements(data.totalAuthors)
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, [searchTerm, page]);


    const handleSearch = (keyword) => {
        setSearchTerm(keyword);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };


    return (
        <div className="author-search-page">
            <SearchBar onSearch={handleSearch} placeholder="Поиск автора"/>
            <span className="count-elements">Количество найденных элементов: {countElements}</span>
            <div className="authors-list">
                {authors.map((author, index) => (
                    <div key={index} className="author-item">
                        <Link to={`/author/${encodeParam(author)}`} className="link">
                            {author}
                        </Link>
                    </div>
                ))}
            </div>
            {/*{totalPages > 1 && (*/}
                <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            {/*)}*/}
        </div>
    );
};

export default SearchAuthorPage;