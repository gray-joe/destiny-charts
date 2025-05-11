'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface DataPoint {
    'Time (s)': string
    [key: string]: string | number
}

interface OverTimeGraphProps {
    data: DataPoint[]
    title?: string
}

export default function OverTimeGraph({
    data,
    title = 'Super Regeneration Over Time',
}: OverTimeGraphProps) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div>No data available</div>
    }

    const sortedData = [...data].sort(
        (a, b) => parseFloat(a['Time (s)']) - parseFloat(b['Time (s)'])
    )

    const weaponNames = Object.keys(sortedData[0]).filter(
        (key) => key !== 'Time (s)'
    )

    const colors = weaponNames.map(
        (_, index) => `hsl(${(index * 360) / weaponNames.length}, 70%, 50%)`
    )

    const chartData = {
        labels: sortedData.map((item) => item['Time (s)']),
        datasets: weaponNames.map((weapon, index) => ({
            label: weapon,
            data: sortedData.map((item) => Number(item[weapon]) * 100),
            borderColor: colors[index],
            backgroundColor: colors[index],
            tension: 0.1,
            pointRadius: 0,
            borderWidth: 1,
        })),
    }

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                maxHeight: 200,
                labels: {
                    color: 'white',
                    boxWidth: 20,
                },
            },
            title: {
                display: true,
                text: title,
                color: 'white',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (seconds)',
                    color: 'white',
                },
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Super Energy (%)',
                    color: 'white',
                },
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                min: 0,
                max: 100,
            },
        },
    }

    return (
        <div className="w-full h-[600px] p-4">
            <Line data={chartData} options={options} />
        </div>
    )
}
