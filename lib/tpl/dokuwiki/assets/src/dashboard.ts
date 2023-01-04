/*
 *	Vendor imports
 */
import { Chart, registerables } from 'chart.js';
import 'jsvectormap/dist/maps/world.js';

/*
 *    Global variables
 */
import createYearChart from './Dashboard/charts/LastYear';
import createPlatformChart from './Dashboard/charts/Platform';
import countryMap from './Dashboard/Countries';

Chart.register(...registerables);
Chart.defaults.font.family = "'Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Arial'";

createYearChart('year');
createPlatformChart('platform');
countryMap('map');
