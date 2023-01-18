import jsVectorMap from 'jsvectormap';

const countryMap: any = (elementId: string) => {
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

        onRegionTooltipShow(event: any, tooltip: any, code: any) {
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
