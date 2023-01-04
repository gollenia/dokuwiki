import { Chart } from 'chart.js';

const months: Array<string> = [
    'Jänner',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
];

declare global {
    interface Window {
        DOKU_STATS: any;
    }
}

const createYearChart = (elementId: string) => {
    if (!window.DOKU_STATS?.year?.months) return;
    const labels: Array<string> = window.DOKU_STATS.year.months.map((month: number) => months[month - 1]);

    const ycelement = document.getElementById(elementId) as HTMLCanvasElement;
    const gradient = ycelement.getContext('2d').createLinearGradient(0, 0, 0, 225);
    gradient.addColorStop(0, '#82b6fb');
    gradient.addColorStop(1, '#e3f0ff');

    const yearChart = new Chart(ycelement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    data: window.DOKU_STATS.year.data,
                    fill: true,
                    borderColor: '#006ffe',
                    backgroundColor: gradient,
                    tension: 0.4,
                },
            ],
        },
        options: {
            hover: {
                intersect: true,
            },
            plugins: {
                filler: {
                    propagate: false,
                },
                legend: {
                    display: false,
                },
            },
            scales: {
                xAxes: {
                    reverse: true,
                },
                yAxes: {
                    ticks: {
                        stepSize: 1000,
                    },
                    display: true,
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                },
            },
        },
    });
};

export default createYearChart;
