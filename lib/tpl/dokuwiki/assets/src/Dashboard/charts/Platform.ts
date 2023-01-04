import { Chart } from 'chart.js';

const createPlatformChart = (elementId: string) => {
    const element: HTMLCanvasElement = document.getElementById(elementId) as HTMLCanvasElement;

    const myChart = new Chart(element, {
        type: 'pie',
        data: {
            labels: Object.keys(window.DOKU_STATS.platform),
            datasets: [
                {
                    label: '# of Votes',
                    data: Object.values(window.DOKU_STATS.platform),
                    backgroundColor: [
                        'rgb(0, 60, 158)',
                        'rgb(0, 104, 239)',
                        'rgb(67, 190, 242)',
                        'rgb(55, 198, 97)',
                        'rgb(184, 215, 62)',
                        'rgb(250, 215, 25)',
                        'rgb(239, 162, 34)',
                        'rgb(230, 55, 59)',
                    ],
                },
            ],
        },
    });
};

export default createPlatformChart;
