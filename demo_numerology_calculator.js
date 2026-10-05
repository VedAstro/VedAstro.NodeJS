/**
 * DEMO: Numerology Calculator (Chaldean system)
 * USE CASE: Birth number, destiny number and name-number predictions
 * DIFFICULTY: Beginner
 *
 * RUN:
 *   node demo_numerology_calculator.js
 */
import { Calculate, Time, GeoLocation } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const name = 'John Doe';
  const birth = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));

  console.log(`Numerology for ${name}`);
  console.log('-'.repeat(50));

  // Numbers derived from the birth date alone
  const birthNumber = await Calculate.BirthNumber(birth);
  await sleep(12_500);
  const destinyNumber = await Calculate.DestinyNumber(birth);
  console.log(`Birth number   : ${birthNumber}`);
  console.log(`Destiny number : ${destinyNumber}`);

  await sleep(12_500);

  // Name number (Chaldean), plus ruling planet and interpretation
  const prediction = await Calculate.NameNumberPrediction(name);
  console.log('-'.repeat(50));
  console.log(`Name           : ${name}`);
  console.log(`Number         : ${prediction.Number}`);
  console.log(`Root number    : ${prediction.RootNumber}`);
  console.log(`Ruling planet  : ${prediction.Planet}`);

  // 'Prediction' is HTML formatted — strip tags for plain terminal output
  const plain = String(prediction.Prediction).replace(/<[^>]+>/g, '');
  console.log(`Interpretation : ${plain.slice(0, 400)}`);

  // NEXT STEPS
  // - Compare spellings of a name: each call is one API request
  // - Combine with the birth chart: await Calculate.PlanetRasiD1Sign('Sun', birth)
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
