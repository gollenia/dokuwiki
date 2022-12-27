import { Chart, registerables } from 'chart.js';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';

const map = new jsVectorMap({
    selector: '#map',
    map: 'world',
    visualizeData: {
        scale: ['#46c7fd', '#003c9e'],
        values: DOKU_STATS.country,
    },
    markerLabelStyle: {
        initial: {
            fill: '#35373e',
        },
        // You can control the hover and selected state for labels as well.
        hover: {
            fill: 'red',
        },
        selected: {
            fill: 'blue',
        },
    },
    onRegionTooltipShow(event, tooltip, code) {
        if (!DOKU_STATS.country) return;
        // When hovering over Canada region the tooltip will change.
        if (code in DOKU_STATS.country) {
            tooltip.text(
                `
        ${tooltip.text()}: ${DOKU_STATS.country[code]}
      `,
                true
            );
        }
    },
});

Chart.register(...registerables);
Chart.defaults.font.family = "'Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Arial'";
const element = document.getElementById('platform');
const myChart = new Chart(element, {
    type: 'pie',

    data: {
        labels: Object.keys(DOKU_STATS.platform),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(DOKU_STATS.platform),
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

const months = [
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
const labels = DOKU_STATS.year.months.map(month => months[month - 1]);
const ycelement = document.getElementById('year');
var gradient = ycelement.getContext('2d').createLinearGradient(0, 0, 0, 225);
gradient.addColorStop(0, '#82b6fb');
gradient.addColorStop(1, '#e3f0ff');
const yearChart = new Chart(ycelement, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                data: DOKU_STATS.year.data,
                fill: true,
                borderColor: '#006ffe',
                backgroundColor: gradient,
                tension: 0.4,
            },
        ],
    },
    options: {
        tooltips: {
            intersect: false,
        },
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
            xAxes: [
                {
                    reverse: true,
                    gridLines: {
                        color: 'rgba(0,0,0,0.0)',
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        stepSize: 1000,
                    },
                    display: true,
                    borderDash: [3, 3],
                    gridLines: {
                        color: 'rgba(0,0,0,0.0)',
                    },
                },
            ],
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
