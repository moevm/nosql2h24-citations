import React, {useState, useEffect} from "react";
import YearSlider from "../components/YearSlider";
import "../css/StatisticsPage.css"
import Chart from "./Chart";

const StatisticsPage = () => {
    const [yearRange, setYearRange] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [viewMode, setViewMode] = useState("quotes");
    const [filters, setFilters] = useState({
        bookYear: [],
    });

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const yearsResponse = await fetch(`${process.env.REACT_APP_API_URL}/filters/years`);
                const yearsData = await yearsResponse.json();
                setYearRange([yearsData.minYear, yearsData.maxYear]);
            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };

        fetchFilters();
    }, []);

    const fetchStatistics = async () => {
        let endpoint = "";

        switch (viewMode) {
            case "authors":
                endpoint = "/authors";
                break;
            case "books":
                endpoint = "/books";
                break;
            case "heroes":
                endpoint = "/heroes";
                break;
            case "quotes":
                endpoint = "/years";
                break;
            default:
                break;
        }


        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/statistics${endpoint}`);
            if (!response.ok) throw new Error("Ошибка загрузки статистики");

            const result = await response.json();
            setStatistics(result.data);
        } catch (error) {
            console.error(error.message);
        }

    };

    useEffect(() => {
        if (yearRange.length > 0) {
            fetchStatistics();
        }
    }, [yearRange, viewMode]);

    const handleViewModeChange = (newMode) => {
        setViewMode(newMode);
    };

    const updateFilters = (updatedFilters) => {
        setFilters((prevFilters) => ({...prevFilters, ...updatedFilters}));
    };

    const handleYearRangeChange = (newRange) => {
        updateFilters({bookYear: newRange});
    };

    return (
        <div className="statistics-page">
            <div className="statistics-controls">
                <div className="year-filter">
                    <YearSlider onYearRangeChange={handleYearRangeChange} initialRange={yearRange}/>
                </div>
                <div className="view-mode-selector">
                    <select
                        value={viewMode}
                        onChange={(e) => handleViewModeChange(e.target.value)}
                    >
                        <option value="authors">По авторам</option>
                        <option value="books">По произведениям</option>
                        <option value="heroes">По героям</option>
                        <option value="quotes">По цитатам</option>
                    </select>
                </div>
            </div>

            <Chart data={statistics}/>

            <div className="statistics-buttons">
                <button className="import-button">Импорт</button>
                <button className="export-button">Экспорт</button>
            </div>
        </div>
    );
};

export default StatisticsPage;