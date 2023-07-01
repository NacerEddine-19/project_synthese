import { memo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;


export const LineChart = memo(({ className, months, itemCountsPerMonth, itemCountsPerMonth2, label, label2, title }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                fullSize: true
            },
            title: {
                display: true,
                text: title,
            }
        },
    };
    const data = {
        labels: months,
        datasets: [
            {
                label: label,
                data: itemCountsPerMonth,
                borderColor: '#239700',
                backgroundColor: '#A2FF86',
                tension: 0.4,
                segment: {
                    borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
                    borderDash: ctx => skipped(ctx, [6, 6]),
                },
            },
            itemCountsPerMonth2 ?
                {
                    label: label2,
                    data: itemCountsPerMonth2,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    tension: 0.4,
                    segment: {
                        borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
                        borderDash: ctx => skipped(ctx, [6, 6]),
                    },
                } : null,
        ],
    };
    return <div className={`area-chart ${className}`}>
        <Line className={``} options={options} data={data} />
    </div>;
});
