import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CitationCard from "../components/CitationCard";
import Pagination from "../components/Pagination";
import DetailsHeroCard from "../components/DetailsHeroCard";
import "../css/HeroDetailsPage.css"

const HeroDetailsPage = () => {
    const {heroName} = useParams();

    const [heroDetails, setHeroDetails] = useState(null);
    const [otherHeroes, setOtherHeroes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const [countElements, setCountElements] = useState(0)

    useEffect(() => {
        fetchHeroDetails();
    }, [heroName, page]);

    useEffect(() => {
        if (heroDetails) {
            document.title = `Герой: ${heroDetails.heroName}`;
            window.scrollTo(0, 0);
        } else {
            document.title = "Детали о герое";
        }
    }, [heroDetails]);

    const fetchHeroDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/details/hero/${heroName}?page=${page}&pageLimit=10`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке деталей цитаты');
            }
            const data = await response.json();
            setHeroDetails(data);
            setCountElements(data.totalQuotes)
            setOtherHeroes(data.quotes);
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

    if (!heroDetails) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="hero-details-page">
            <DetailsHeroCard {...heroDetails}/>
            <span className="other-hero-title">Другие цитаты:</span>
            <span className="count-elements">Количество найденных элементов: {countElements}</span>
            <div className="other-hero">

            </div>
            {otherHeroes.length === 0 ? (
                <p>Других цитат нет.</p>
            ) : (
                otherHeroes.map((quote) => (
                    <CitationCard
                        key={quote._id}
                        id={quote._id}
                        quote={quote.quote}
                        heroName={quote.heroName}
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

export default HeroDetailsPage;