import React from "react";
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, Tooltip, BarElement);

const Chart = ({ data }) => {
    if (!data || data.length === 0) return <div>Нет данных для отображения</div>;

    const backgroundColors = data.map((_, index) =>
        index % 2 === 0 ? "rgba(232, 90, 79, 1)" : "rgba(233, 128, 116, 1)"
    );

    const barChartData = {
        labels: data.map((item) => item.x),
        datasets: [
            {
                data: data.map((item) => item.count),
                backgroundColor: backgroundColors,
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                },

                border: {
                    width: 5,
                    color: "#D8C3A5",
                },
                offset: true,
                ticks: {
                    font: {
                        size: 16,
                    },
                },
            },
            y: {
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                },
                beginAtZero: true,

                border: {
                    width: 5,
                    color: "#D8C3A5",
                },
                offset: true,
                ticks: {
                    font: {
                        size: 16,
                    },
                },
            },
        },
    };

    console.log(barChartData)

    return (
        <div style={{ width: "100%", height: "70vh" }}>
            <Bar data={barChartData} options={options} />
        </div>
    );
};

export default Chart;
