import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import CitationCard from '../components/CitationCard';
import Pagination from '../components/Pagination';
import "../css/QuoteDetailsPage.css"
import DetailsCitationCard from "../components/DetailsCitationCard";

const QuoteDetailsPage = () => {
    const {quoteId} = useParams();

    const [quoteDetails, setQuoteDetails] = useState(null);
    const [otherQuotes, setOtherQuotes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const [countElements, setCountElements] = useState(0)

    useEffect(() => {
        fetchQuoteDetails();
    }, [quoteId, page]);

    useEffect(() => {
        if (quoteDetails && quoteDetails.quote) {
            document.title = quoteDetails.quote;
            window.scrollTo(0, 0);
        } else {
            document.title = "Детали о цитате";
        }
    }, [quoteDetails]);

    const fetchQuoteDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/details/quote/${quoteId}?page=${page}&pageLimit=10`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке деталей цитаты');
            }
            const data = await response.json();
            setQuoteDetails(data.quote);
            setCountElements(data.totalQuotes)
            setOtherQuotes(data.otherQuotesByAuthor);
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

    if (!quoteDetails) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="quote-details-page">
            <DetailsCitationCard {...quoteDetails}/>
            <span className="other-quote-title">Другие цитаты:</span>
            <span className="count-elements">Количество найденных элементов: {countElements}</span>
            <div className="other-quote">

            </div>
            {otherQuotes.length === 0 ? (
                <p>Других цитат нет.</p>
            ) : (
                otherQuotes.map((quote) => (
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

export default QuoteDetailsPage;