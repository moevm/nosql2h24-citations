import React from 'react';
import "../css/Pagination.css"

const Pagination = ({ page, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        const prevPage = Math.max(1, Math.floor((page - 1) / 5) - 4);
        onPageChange(prevPage);
        scrollToTop();
    };

    const handleNext = () => {
        const nextPage = Math.min(totalPages, Math.ceil(page / 5) * 5 + 1);
        onPageChange(nextPage);
        scrollToTop();
    };

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const renderPageNumbers = () => {
        const pages = [];

        const startPage = Math.floor((page - 1) / 5) * 5 + 1;
        const endPage = Math.min(startPage + 4, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={i === page ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(<span className="dots" key="dots">...</span>);
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    className={totalPages === page ? 'active' : ''}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                className="previousButton"
                onClick={handlePrevious}
                disabled={page <= 5}
            >
                &lt;
            </button>
            {renderPageNumbers()}
            <button
                className="nextButton"
                onClick={handleNext}
                disabled={page > totalPages - 5}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
