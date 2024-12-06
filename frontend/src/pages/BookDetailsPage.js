import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DetailsBookCard from "../components/DetailsBookCard";
import CitationCard from "../components/CitationCard";
import Pagination from "../components/Pagination";
import "../css/BookDetailsPage.css"

const BookDetailsPage = () => {
    const {bookName} = useParams();

    const [bookDetails, setBookDetails] = useState(null);
    const [otherBooks, setOtherBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const [countElements, setCountElements] = useState(0)

    useEffect(() => {
        fetchBookDetails();
    }, [bookName, page]);

    useEffect(() => {
        if (bookDetails && bookDetails.book) {
            document.title = `Произведение: ${bookDetails.bookName}`;
            window.scrollTo(0, 0);
        } else {
            document.title = "Детали цитаты";
        }
    }, [bookDetails]);

    const fetchBookDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/details/book/${bookName}?page=${page}&pageLimit=10`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке деталей цитаты');
            }
            const data = await response.json();
            setBookDetails(data);
            setCountElements(data.totalQuotes)
            setOtherBooks(data.quotes);
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

    if (!bookDetails) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="book-details-page">
            <DetailsBookCard {...bookDetails}/>
            <span className="other-book-title">Другие цитаты:</span>
            <span className="count-elements">Количество найденных элементов: {countElements}</span>
            <div className="other-book">

            </div>
            {otherBooks.length === 0 ? (
                <p>Других цитат нет.</p>
            ) : (
                otherBooks.map((quote) => (
                    <CitationCard
                        key={quote._id}
                        id={quote._id}
                        quote={quote.quote}
                        bookName={quote.bookName}
                        book={quote.book}
                        hero={quote.hero}
                    />
                ))
            )}
            {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            )}

        </div>
    );
};

export default BookDetailsPage;