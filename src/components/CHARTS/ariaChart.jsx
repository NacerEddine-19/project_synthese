import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { memo } from 'react';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
export const AreaChart = memo(({ className, title, itemCountsPerMonth, months }) => {
    const data = {
        labels: months,
        datasets: [
            {
                fill: true,
                label: 'User Count',
                data: itemCountsPerMonth,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                color: '#fff',
                tension: 0.4,
                spanGaps: true

            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
    return (
        <div className={`area-chart ${className}`}>
            {itemCountsPerMonth && <Line options={options} data={data} />}
        </div>
    );
});