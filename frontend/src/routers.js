import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import SearchAuthorPage from "./pages/SearchAuthorPage";
import SearchHeroPage from "./pages/SearchHeroPage";
import SearchBookPage from "./pages/SearchBookPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search_author" element={<SearchAuthorPage />} />
            <Route path="/search_hero" element={<SearchHeroPage />} />
            <Route path="/search_book" element={<SearchBookPage />} />
        </Routes>
    );
};

export default AppRoutes;