import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import SearchHeroPage from "./pages/SearchHeroPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search_hero" element={<SearchHeroPage />} />
        </Routes>
    );
};

export default AppRoutes;