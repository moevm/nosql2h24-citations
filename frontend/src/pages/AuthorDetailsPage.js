import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CitationCard from "../components/CitationCard";
import Pagination from "../components/Pagination";
import DetailsAuthorCard from "../components/DetailsAuthorCard";
import "../css/AuthorDetailsPage.css"

const AuthorDetailsPage = () => {
    const {authorName} = useParams();

    const [authorDetails, setAuthorDetails] = useState(null);
    const [otherAuthors, setOtherAuthors] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const [countElements, setCountElements] = useState(0)

    useEffect(() => {
        fetchAuthorDetails();
    }, [authorName, page]);

    useEffect(() => {
        if (authorDetails) {
            document.title = `Автор: ${authorDetails.authorName}`;
            window.scrollTo(0, 0);
        } else {
            document.title = "Детали об авторе";
        }
    }, [authorDetails]);

    const fetchAuthorDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/details/author/${authorName}?page=${page}&pageLimit=10`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке деталей цитаты');
            }
            const data = await response.json();
            setAuthorDetails(data);
            setCountElements(data.totalQuotes)
            setOtherAuthors(data.quotes);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (error) {
        return <div className="error-message">Ошибка: {error}</div>;
    }

    if (!authorDetails) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="author-details-page">
            <DetailsAuthorCard {...authorDetails}/>
            <span className="other-author-title">Другие цитаты:</span>
            <span className="count-elements">Количество найденных элементов: {countElements}</span>
            <div className="other-author">

            </div>
            {otherAuthors.length === 0 ? (
                <p>Других цитат нет.</p>
            ) : (
                otherAuthors.map((quote) => (
                    <CitationCard
                        key={quote._id}
                        id={quote._id}
                        quote={quote.quote}
                        authorName={quote.authorName}
                        book={quote.book}
                        hero={quote.hero}
                    />
                ))
            )}
            {/*{totalPages > 1 && (*/}
                <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            {/*)}*/}

        </div>
    );
};

export default AuthorDetailsPage;