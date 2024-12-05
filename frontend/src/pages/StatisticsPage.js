import React, {useState, useEffect} from "react";
import YearSlider from "../components/YearSlider";
import "../css/StatisticsPage.css"
import Chart from "./Chart";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFileImport, faFileExport } from "@fortawesome/free-solid-svg-icons";

const StatisticsPage = () => {
    const [countElements, setCountElements] = useState(0)
    const [yearRange, setYearRange] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [viewMode, setViewMode] = useState("quotes");
    const [filters, setFilters] = useState({ bookYear: [] });

    const options = [
        { value: "authors", label: "По авторам" },
        { value: "books", label: "По произведениям" },
        { value: "heroes", label: "По героям" },
        { value: "quotes", label: "По цитатам" },
    ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: `1px solid ${state.isFocused ? "#E85A4F" : "#D8C3A5"}`,
            borderRadius: "5px",
            backgroundColor: "none",
            boxShadow: state.isFocused ? "0 0 4px rgba(212, 100, 80, 0.5)" : "none",
            padding: "2px 4px",
            cursor: "pointer",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "rgba(216, 195, 165, 1)"
                : state.isFocused
                    ? "#f1ebe4"
                    : "#f9f6f1",
            color: "#444",
            padding: "10px",
            cursor: "pointer",
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: "5px",
            marginTop: "4px",
            backgroundColor: "#f9f6f1",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#444",
        }),
    };

    const fetchStatistics = async () => {
        const endpoints = {
            authors: "/authors",
            books: "/books",
            heroes: "/heroes",
            quotes: "/years",
        };

        const endpoint = endpoints[viewMode];
        if (!endpoint) return;

        try {
            const queryParams = new URLSearchParams();
            if (filters.bookYear.length) {
                queryParams.append("bookYearStart", filters.bookYear[0]);
                queryParams.append("bookYearEnd", filters.bookYear[1]);
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/statistics${endpoint}?${queryParams.toString()}`
            );
            if (!response.ok) throw new Error("Ошибка загрузки статистики");

            const result = await response.json();
            setStatistics(result.data);
            setCountElements(result.totalElements)
        } catch (error) {
            console.error("Ошибка загрузки статистики:", error);
        }
    };

    useEffect(() => {
        if (yearRange.length > 0 || viewMode !== "quotes") {
            fetchStatistics();
        }
    }, [filters, viewMode]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const yearsResponse = await fetch(`${process.env.REACT_APP_API_URL}/filters/years`);
                const yearsData = await yearsResponse.json();
                setYearRange([yearsData.minYear, yearsData.maxYear]);
                setFilters({ bookYear: [yearsData.minYear, yearsData.maxYear] });
            } catch (error) {
                console.error("Ошибка при загрузке диапазона лет:", error);
            }
        };

        fetchFilters();
    }, []);

    const handleYearRangeChange = (newRange) => {
        setFilters((prevFilters) => ({ ...prevFilters, bookYear: newRange }));
    };

    const handleImport = async () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".json";
        fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/data/import`, {
                        method: "POST",
                        body: formData,
                    });
                    const result = await response.json();
                    if (response.ok) {
                        alert(`Импортировано успешно: ${result.count} записей`);
                        fetchStatistics();
                    } else {
                        alert(`Ошибка импорта: ${result.message}`);
                    }
                } catch (error) {
                    console.error("Ошибка импорта:", error);
                }
            }
        };
        fileInput.click();
    };

    const handleExport = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/data/export`);
            if (response.ok) {
                const blob = await response.blob();
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = "quotes.json";
                link.click();
                alert("Данные успешно экспортированы!");
            } else {
                alert("Ошибка экспорта данных");
            }
        } catch (error) {
            console.error("Ошибка экспорта:", error);
        }
    };

    return (
        <div className="statistics-page">
            <div className="statistics-content">
                {viewMode === "quotes" && (
                    <div className="slider-container">
                        <YearSlider onYearRangeChange={handleYearRangeChange} initialRange={yearRange}/>
                    </div>
                )}
                <div className="chart-view-mode">
                    <div className="view-mode-info">
                        <span className="count-elements">Количество обрабатываемых элементов: {countElements}</span>
                        <div className="view-mode-selector">
                            <Select
                                options={options}
                                value={options.find((option) => option.value === viewMode)}
                                onChange={(selectedOption) => setViewMode(selectedOption.value)}
                                styles={customStyles}
                                menuPlacement="auto"
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    <Chart key={viewMode} data={statistics}/>
                </div>
            </div>
            <div className="statistics-buttons">
                <button className="import-button" onClick={handleImport}>
                    <FontAwesomeIcon icon={faFileImport}/>
                    Импорт
                </button>
                <button className="export-button" onClick={handleExport}>
                    <FontAwesomeIcon icon={faFileExport}/>
                    Экспорт
                </button>
            </div>
        </div>
    );
};

export default StatisticsPage;