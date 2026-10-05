/**
 * DEMO: Current Planetary Positions
 * USE CASE: Get today's planetary positions for any location
 * DIFFICULTY: Beginner
 *
 * RUN:
 *   node demo_current_planets.js
 */
import { Calculate, Time, GeoLocation, PlanetName } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const now = new Date();
  const location = new GeoLocation('London', -0.1278, 51.5074);

  // Build a Time from "now". Note: Date's month is 0-based, Time's is not.
  const current = new Time({
    hour: now.getHours(), minute: now.getMinutes(),
    day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear(),
    offset: '+00:00', geolocation: location
  });

  const planets = [PlanetName.Sun, PlanetName.Moon, PlanetName.Mars,
    PlanetName.Mercury, PlanetName.Jupiter, PlanetName.Venus,
    PlanetName.Saturn, PlanetName.Rahu, PlanetName.Ketu];

  console.log('Current Planetary Positions:');
  for (const planet of planets) {
    const sign = await Calculate.PlanetRasiD1Sign(planet, current);
    const star = await Calculate.PlanetConstellation(planet, current);
    console.log(`  ${planet}: ${sign.Name} in ${star}`);
    await sleep(12_500); // free tier: 5 calls/min, and this loop makes 2 each
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
