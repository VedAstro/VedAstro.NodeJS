/**
 * DEMO: Batch Processing
 * USE CASE: Process many charts without tripping the free tier's rate limit
 * DIFFICULTY: Advanced
 *
 * The free tier allows 5 requests per minute, so a naive Promise.all() over 50
 * charts will mostly fail. Two ways to cope are shown below:
 *   A. A throttled queue  (works on the free tier, just slower)
 *   B. Concurrency with retry  (works well on a premium key)
 *
 * RUN:
 *   node demo_batch_processing.js
 */
import { Calculate, Time, GeoLocation, PlanetName } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// --- A minimal token-bucket style throttle -------------------------------
// Allows at most `limit` calls per `windowMs`, keeping a minimum gap between
// consecutive calls so the server's sliding window never fills up.
function createThrottle(limit, windowMs) {
  const gap = Math.ceil(windowMs / limit);
  let last = 0;
  return async function throttle() {
    const wait = last + gap - Date.now();
    if (wait > 0) await sleep(wait);
    last = Date.now();
  };
}

const people = [
  { name: 'Mumbai', time: '14:30 25/10/1992 +05:30', lon: 72.8777, lat: 19.0760 },
  { name: 'Tokyo', time: '23:40 31/12/2010 +08:00', lon: 139.83, lat: 35.65 },
  { name: 'New York', time: '09:00 15/06/1997 -05:00', lon: -74.006, lat: 40.7128 }
];

try {
  Calculate.SetAPIKey('FreeAPIUser');

  // --- A. Throttled sequential processing -------------------------------
  const throttle = createThrottle(5, 60_000); // 5 calls per minute
  const results = [];

  for (const person of people) {
    await throttle();
    const birth = new Time(person.time, new GeoLocation(person.name, person.lon, person.lat));
    const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
    results.push({ place: person.name, sunSign: sun.Name });
    console.log(`${person.name.padEnd(10)} Sun in ${sun.Name}`);
  }

  console.log(`\nProcessed ${results.length} charts.`);
  console.log(JSON.stringify(results, null, 2));

  // --- B. Concurrency with retry (for a premium key) --------------------
  // Uncomment if you have a paid key, which allows far more calls per minute.
  //
  // async function withRetry(fn, attempts = 3) {
  //   for (let i = 1; i <= attempts; i += 1) {
  //     try { return await fn(); }
  //     catch (error) {
  //       if (i === attempts) throw error;
  //       await sleep(15_000);
  //     }
  //   }
  // }
  //
  // const charts = await Promise.all(people.map(person => withRetry(async () => {
  //   const birth = new Time(person.time, new GeoLocation(person.name, person.lon, person.lat));
  //   return { place: person.name, ...(await Calculate.AllPlanetData(PlanetName.Sun, birth)) };
  // })));
  //
  // Tip: for very large jobs, cache results by chart so a retry or a re-run
  // does not spend another API call.

  // NOTE: the throttle above paces requests but does not persist them. For a
  // long job, checkpoint `results` to disk as you go.
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
