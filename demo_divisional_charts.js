/**
 * DEMO: Divisional Charts (vargas)
 * USE CASE: Read planetary positions in D9, D10 and D12 charts
 * DIFFICULTY: Intermediate
 *
 * A varga divides each sign into finer parts. D9 (Navamsha) is used for
 * marriage and dharma, D10 (Dashamsha) for career, D12 (Dwadashamsha) for
 * parents. A planet can sit in a different sign in each varga.
 *
 * RUN:
 *   node demo_divisional_charts.js
 */
import { Calculate, Time, GeoLocation, PlanetName, ChartType } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const birth = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));

  console.log('Sun sign across divisional charts:\n');

  // D1 (Rasi) for comparison
  const d1 = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
  console.log(`  D1  (Rasi):         ${d1.Name}`);
  await sleep(12_500);

  // D9 (Navamsha)
  const d9 = await Calculate.PlanetNavamshaD9Sign(PlanetName.Sun, birth);
  console.log(`  D9  (Navamsha):     ${d9.Name}`);
  await sleep(12_500);

  // D10 (Dashamsha) — career
  const d10 = await Calculate.PlanetDashamamshaD10Sign(PlanetName.Sun, birth);
  console.log(`  D10 (Dashamsha):    ${d10.Name}`);
  await sleep(12_500);

  // D12 (Dwadashamsha) — parents
  const d12 = await Calculate.PlanetDwadashamshaD12Sign(PlanetName.Sun, birth);
  console.log(`  D12 (Dwadashamsha): ${d12.Name}`);

  // Whole-chart variants return every house at once:
  //   await Calculate.AllHouseNavamshaSign(birth)
  // The ChartType enum lists the 17 vargas used by the SVG chart methods:
  console.log(`\nAvailable ChartType values: ${Object.keys(ChartType).join(', ')}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
