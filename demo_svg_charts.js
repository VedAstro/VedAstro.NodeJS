/**
 * DEMO: SVG Chart Rendering
 * USE CASE: Render North/South Indian style charts as SVG
 * DIFFICULTY: Intermediate
 *
 * The chart methods resolve to an SVG *string*, not JSON — you can write it to
 * a file, inline it in HTML, or convert it to PNG.
 *
 * RUN:
 *   node demo_svg_charts.js
 *   # then open south_indian_chart.svg in a browser
 */
import fs from 'node:fs';
import { Calculate, Time, GeoLocation, ChartType } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const birth = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));

  // Second argument is a ChartType (defaults to Rasi D1)
  const south = await Calculate.SouthIndianChart(birth, ChartType.RasiD1);
  console.log(`South Indian chart: ${typeof south}, ${south.length} chars of SVG`);
  fs.writeFileSync('south_indian_chart.svg', south);

  await sleep(12_500);

  const north = await Calculate.NorthIndianChart(birth, ChartType.NavamshaD9);
  console.log(`North Indian chart: ${typeof north}, ${north.length} chars of SVG`);
  fs.writeFileSync('north_indian_chart.svg', north);

  await sleep(12_500);

  // SkyChart is the circular Western/Vedic style chart
  const sky = await Calculate.SkyChart(birth);
  console.log(`Sky chart: ${typeof sky}, ${sky.length} chars of SVG`);
  fs.writeFileSync('sky_chart.svg', sky);

  console.log('\nWrote south_indian_chart.svg, north_indian_chart.svg, sky_chart.svg');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
