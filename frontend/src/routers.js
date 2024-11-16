import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import SearchBookPage from "./pages/SearchBookPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search_book" element={<SearchBookPage />} />
        </Routes>
    );
};

export default AppRoutes;