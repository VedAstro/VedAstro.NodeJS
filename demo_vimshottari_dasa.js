/**
 * DEMO: Vimshottari Dasa Timeline
 * USE CASE: Planetary periods (Mahadasa -> Bhukti -> Antaram) over a date range
 * DIFFICULTY: Intermediate
 *
 * RUN:
 *   node demo_vimshottari_dasa.js
 */
import { Calculate, Time, GeoLocation } from 'vedastro';

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const mumbai = new GeoLocation('Mumbai', 72.8777, 19.0760);
  const birth = new Time('14:30 25/10/1992 +05:30', mumbai);

  const start = new Time('00:00 01/01/2020 +05:30', mumbai);
  const end = new Time('23:59 31/12/2030 +05:30', mumbai);

  // levels         = nesting depth (1 = Mahadasa, 2 = +Bhukti, 3 = +Antaram)
  // precisionHours = scan resolution; larger is faster but coarser
  const dasa = await Calculate.DasaAtRange(birth, start, end, 3, 100);

  console.log(JSON.stringify(dasa, null, 2));

  // A single moment instead of a range:
  //   await Calculate.DasaAtTime(birth, someTime, 3)
  // The whole life span:
  //   await Calculate.DasaForLife(birth, 3, 100, 120)
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
