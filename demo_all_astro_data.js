/**
 * DEMO: All Astro Data
 * USE CASE: Dump the complete planet and house dataset for a chart
 * DIFFICULTY: Intermediate
 *
 * AllPlanetData / AllHouseData return large payloads. This demo fetches a few
 * of them and writes the combined result to JSON so you can inspect them.
 *
 * RUN:
 *   node demo_all_astro_data.js
 */
import fs from 'node:fs';
import { Calculate, Time, GeoLocation, PlanetName } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const birth = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));

  const report = {};

  // Everything about the Sun, in one call
  report.sun = await Calculate.AllPlanetData(PlanetName.Sun, birth);
  console.log(`Sun data keys: ${Object.keys(report.sun ?? {}).join(', ')}`);
  await sleep(12_500);

  // Everything about the first house
  report.house1 = await Calculate.AllHouseData(1, birth);
  console.log(`House 1 data keys: ${Object.keys(report.house1 ?? {}).join(', ')}`);
  await sleep(12_500);

  // The whole moment: panchanga, positions, dasa and more
  report.time = await Calculate.AllTimeData(birth);
  console.log(`Time data keys: ${Object.keys(report.time ?? {}).join(', ')}`);

  fs.writeFileSync('astro_data.json', JSON.stringify(report, null, 2));
  console.log('\nWrote astro_data.json');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
