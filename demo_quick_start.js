/**
 * DEMO: Quick Start - Your First Vedic Astrology Calculation
 * USE CASE: Learn the absolute basics in a few lines of code
 * DIFFICULTY: Beginner
 *
 * RUN:
 *   node demo_quick_start.js
 *
 * EXPECTED OUTPUT:
 *   Sun Sign: Libra
 */
import { Calculate, Time, GeoLocation, PlanetName } from 'vedastro';

try {
  // Step 1: Set API Key
  // Free tier: 'FreeAPIUser' (5 requests per minute)
  // Premium: get your key from https://vedastro.org/API.html
  Calculate.SetAPIKey('FreeAPIUser');

  // Step 2: Define birth time and location
  // Format: "HH:MM DD/MM/YYYY +TZ:TZ" — note GeoLocation(name, longitude, latitude)
  const birth = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));

  // Step 3: Make your first calculation
  const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);

  // Step 4: Display the result
  console.log(`Sun Sign: ${sun.Name}`);

  // NEXT STEPS
  // - Moon sign:  await Calculate.PlanetRasiD1Sign(PlanetName.Moon, birth)
  // - Ascendant:  await Calculate.HouseSignName(1, birth)
  // - More examples: see README.md
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
