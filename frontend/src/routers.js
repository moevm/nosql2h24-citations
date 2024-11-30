import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import SearchAuthorPage from "./pages/SearchAuthorPage";
import SearchHeroPage from "./pages/SearchHeroPage";
import SearchBookPage from "./pages/SearchBookPage";
import StatisticsPage from "./pages/StatisticsPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search_author" element={<SearchAuthorPage />} />
            <Route path="/search_hero" element={<SearchHeroPage />} />
            <Route path="/search_book" element={<SearchBookPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
    );
};

export default AppRoutes;