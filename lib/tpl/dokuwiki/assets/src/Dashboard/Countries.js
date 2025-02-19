import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';

const countryMap = elementId => {
    const mymap = new jsVectorMap({
        selector: '#' + elementId,
        map: 'world',
        visualizeData: {
            scale: ['#46c7fd', '#003c9e'],
            values: window.DOKU_STATS.country,
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
            if (!window.DOKU_STATS.country) return;
            if (code in window.DOKU_STATS.country) {
                tooltip.text(
                    `
			${tooltip.text()}: ${window.DOKU_STATS.country[code]}
		  `,
                    true
                );
            }
        },
    });
};

export default countryMap;
