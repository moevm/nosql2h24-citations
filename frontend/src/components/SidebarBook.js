import React, {useEffect, useState} from 'react';
import '../css/Sidebar.css';
import YearSlider from "./YearSlider";
import {faChevronDown, faChevronUp, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SidebarBook = ({onFilterChange}) => {
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [yearRange, setYearRange] = useState([]);

    const defaultDisplayCount = 10;
    const [displayCount, setDisplayCount] = useState({
        authors: defaultDisplayCount,
    });

    const [filterVisibility, setFilterVisibility] = useState({
        authors: true,
    });

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const authorsResponse = await fetch('http://localhost:3000/filters/authors');
                const authorsData = await authorsResponse.json();
                setAuthors(authorsData);

                const yearsResponse = await fetch('http://localhost:3000/filters/years');
                const yearsData = await yearsResponse.json();
                setYearRange([yearsData.minYear, yearsData.maxYear]);
            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };

        fetchFilters();
    }, []);

    const handleCheckboxChange = (category, value) => {
        let updatedSelection;

        switch (category) {
            case 'authorName':
                updatedSelection = toggleSelection(selectedAuthors, value);
                setSelectedAuthors(updatedSelection);
                onFilterChange({authorName: updatedSelection});
                break;
            default:
                break;
        }
    };

    const toggleSelection = (array, value) => {
        return array.includes(value) ? array.filter(item => item !== value) : [...array, value];
    };

    const handleYearRangeChange = (newRange) => {
        // setYearRange(newRange);
        onFilterChange({bookYear: newRange});
    };


    const toggleFilterVisibility = (filterName) => {
        setFilterVisibility(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
        if (filterVisibility[filterName]) {
            setDisplayCount(prev => ({
                ...prev,
                [filterName]: defaultDisplayCount
            }));
        }
    };

    const handleShowMore = (category) => {
        const itemsLength =  category === 'authors' ? authors.length : 0;
        setDisplayCount((prev) => ({
            ...prev,
            [category]: prev[category] === defaultDisplayCount ? itemsLength : defaultDisplayCount,
        }));
    };

console.log(authors)
    return (
        <div className="sidebar">
            <div className="filter-section">
                <h3 onClick={() => toggleFilterVisibility('authors')} style={{cursor: 'pointer'}}>
                    Автор
                    <FontAwesomeIcon icon={filterVisibility.authors ? faChevronUp : faChevronDown} className="icon"/>
                </h3>
                {filterVisibility.authors && (
                    <div className="filters">
                        {authors.slice(0, displayCount.authors).map((author, index) => (
                            <div className="filter" key={index}>
                                <input
                                    type="checkbox"
                                    id={`author-${index}`}
                                    onChange={() => handleCheckboxChange('authorName', author)}
                                    checked={selectedAuthors.includes(author)}
                                />
                                <label htmlFor={`author-${index}`}>{author}</label>
                            </div>
                        ))}
                        {authors.length > defaultDisplayCount && displayCount.authors === defaultDisplayCount && (
                            <button onClick={() => handleShowMore('authors')} className="show-more">
                                <FontAwesomeIcon icon={faPlus} /> Показать все
                            </button>
                        )}
                    </div>
                )}
            </div>

            <YearSlider onYearRangeChange={handleYearRangeChange} initialRange={yearRange}/>
        </div>
    );
};

export default SidebarBook;