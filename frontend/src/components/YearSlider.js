import ReactSlider from 'react-slider';
import '../css/YearSlider.css';
import React, {useEffect, useRef, useState} from 'react';


const YearSlider = ({ onYearRangeChange, initialRange }) => {
    const [yearRange, setYearRange] = useState(initialRange);
    const [initial, setInitial] = useState(initialRange);

    useEffect(() => {
        if (initial[0] !== initialRange[0] || initial[1] !== initialRange[1]) {
            setInitial(initialRange);
        }
    }, [initialRange]);

    useEffect(() => {
        setYearRange(initialRange);
    }, [initialRange]);

    const handleSliderChange = (values) => {
        setYearRange(values);
        onYearRangeChange(values);
    };


    const handleMinYearChange = (e) => {
        const newMinYear = Math.min(Math.max(initialRange[0], +e.target.value), yearRange[1] - 1);
        const newRange = [newMinYear, yearRange[1]];
        setYearRange(newRange);
        onYearRangeChange(newRange);
    };

    const handleMaxYearChange = (e) => {
        const newMaxYear = Math.max(Math.min(initialRange[1], +e.target.value), yearRange[0] + 1);
        const newRange = [yearRange[0], newMaxYear];
        setYearRange(newRange);
        onYearRangeChange(newRange);
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
                value={yearRange}
                min={initial[0]}
                max={initial[1]}
                onAfterChange={handleSliderChange}
                allowCross={false}
                minDistance={1}
            />
            <div className="year-inputs">
                <input
                    type="number"
                    value={yearRange[0]}
                    className="year-input"
                    min={initial[0]}
                    max={yearRange[1] - 1}
                    onChange={handleMinYearChange}
                />
                <span className="dash">—</span>
                <input
                    type="number"
                    value={yearRange[1]}
                    className="year-input"
                    min={yearRange[0] + 1}
                    max={initial[1]}
                    onChange={handleMaxYearChange}
                />
            </div>
        </div>
    );
};

export default YearSlider;