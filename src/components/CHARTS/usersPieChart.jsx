import { memo, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const UserPieChart = memo(({ className, data, labels, title }) => {
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
                    backgroundColor: [
                        '#9966FF',
                        '#C9CBCF',
                        '#059BFF',
                        '#4BC0C0',
                        '#FFCD56',
                        '#FF9F40',
                        '#FF6384',
                        '#8685FE',
                    ],
                    borderWidth: 1,
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