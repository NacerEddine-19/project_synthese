import { memo, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const backgroundColor = [
    '#9966FF',
    '#C9CBCF',
    '#059BFF',
    '#4BC0C0',
    '#FFCD56',
    '#FF9F40',
    '#FF6384',
    '#8685FE',
];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create a scrambled array from the backgroundColor array
export const scrambledArray = shuffleArray([...backgroundColor]);

export const PieChart = memo(({ className, data, labels, title }) => {
    const [dataChart, setData] = useState();

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

    useEffect(() => {
        setData({
            labels: labels,
            datasets: [
                {
                    label: ' Users Count ',
                    data: data,
                    backgroundColor: scrambledArray,
                    borderWidth: 1,
                    spanGaps: true
                },
            ],
        });
    }, [data, labels]);

    return (
        <>
            {dataChart && <div className={`${className} pie-chart`}>
                <Pie options={options} data={dataChart} />
            </div>}
        </>
    );
});