/**
 * DEMO: Birth Chart Basics
 * USE CASE: Display the Sun, Moon and Ascendant ("the big three") signs
 * DIFFICULTY: Beginner
 *
 * RUN:
 *   node demo_birth_chart_basics.js
 */
import { Calculate, Time, GeoLocation, PlanetName } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const birth = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));

  // The free tier allows 5 calls per minute, so pause between calls.
  const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
  console.log(`Sun:    ${sun.Name}`);

  await sleep(12_500);
  const moon = await Calculate.PlanetRasiD1Sign(PlanetName.Moon, birth);
  console.log(`Moon:   ${moon.Name}`);

  await sleep(12_500);
  // HouseSignName takes a house NUMBER (1 = first house / ascendant).
  const ascendant = await Calculate.HouseSignName(1, birth);
  console.log(`Rising: ${ascendant}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
