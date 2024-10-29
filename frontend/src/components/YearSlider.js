import ReactSlider from 'react-slider';
import '../css/YearSlider.css';
import React, { useState } from 'react';


const YearSlider = () => {

    const min = 1999;
    const max = 2024;

    const [minYear, setMinYear] = useState(min);
    const [maxYear, setMaxYear] = useState(max);



    const handleSliderChange = (values) => {
        const [newMinYear, newMaxYear] = values;
        setMinYear(newMinYear);
        setMaxYear(newMaxYear);
    };


    const handleMinInputChange = (e) => {
        const value = Math.min(Number(e.target.value), maxYear - 1);
        setMinYear(value);
    };


    const handleMaxInputChange = (e) => {
        const value = Math.max(Number(e.target.value), minYear + 1);
        setMaxYear(value);
    };

    return (
        <div className="slider-wrapper">
            <div className="slider-header">
                <span className="slider-title">Год</span>
            </div>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={[minYear, maxYear]}
                min={min}
                max={max}
                onChange={handleSliderChange}
                allowCross={false}
                minDistance={1}
            />
            <div className="year-inputs">
                <input
                    type="digit"
                    value={minYear}
                    className="year-input"
                    min={min}
                    max={maxYear - 1}
                    onChange={handleMinInputChange}
                />
                <span className="dash">—</span>
                <input
                    type="digit"
                    value={maxYear}
                    className="year-input"
                    min={minYear + 1}
                    max={max}
                    onChange={handleMaxInputChange}
                />
            </div>
        </div>
    );
};

export default YearSlider;