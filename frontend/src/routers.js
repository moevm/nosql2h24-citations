import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import SearchAuthorPage from "./pages/SearchAuthorPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search_author" element={<SearchAuthorPage />} />
        </Routes>
    );
};

export default AppRoutes;