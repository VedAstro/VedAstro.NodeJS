/**
 * DEMO: Daily Panchanga
 * USE CASE: Get today's Tithi, Nakshatra, Yoga and Karana for a location
 * DIFFICULTY: Beginner
 *
 * Panchanga is location-sensitive because it is reckoned from local sunrise.
 *
 * RUN:
 *   node demo_daily_panchanga.js
 */
import { Calculate, Time, GeoLocation } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const now = new Date();
  const location = new GeoLocation('Mumbai', 72.8777, 19.0760);

  const today = new Time({
    hour: now.getHours(), minute: now.getMinutes(),
    day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear(),
    offset: '+05:30', geolocation: location
  });

  const tithi = await Calculate.LunarDay(today);
  await sleep(12_500);
  const nakshatra = await Calculate.MoonConstellation(today);
  await sleep(12_500);
  const yoga = await Calculate.NithyaYoga(today);
  await sleep(12_500);
  const karana = await Calculate.Karana(today);

  console.log(`Panchanga for ${now.toDateString()}`);
  console.log(`Tithi:     ${tithi}`);
  console.log(`Nakshatra: ${nakshatra}`);
  console.log(`Yoga:      ${yoga}`);
  console.log(`Karana:    ${karana}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
