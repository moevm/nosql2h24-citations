import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import SearchAuthorPage from "./pages/SearchAuthorPage";
import SearchHeroPage from "./pages/SearchHeroPage";
import SearchBookPage from "./pages/SearchBookPage";
import StatisticsPage from "./pages/StatisticsPage";
import QuoteDetailsPage from "./pages/QuoteDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import HeroDetailsPage from "./pages/HeroDetailsPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search_author" element={<SearchAuthorPage />} />
            <Route path="/search_hero" element={<SearchHeroPage />} />
            <Route path="/search_book" element={<SearchBookPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/quote/:quoteId" element={<QuoteDetailsPage />} />
            <Route path="/author/:authorName" element={<AuthorDetailsPage />} />
            <Route path="/book/:bookName" element={<BookDetailsPage />} />
            <Route path="/hero/:heroName" element={<HeroDetailsPage />} />
        </Routes>
    );
};

export default AppRoutes;