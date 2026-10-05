/**
 * DEMO: Error Handling
 * USE CASE: Handle API failures, rate limits and bad input correctly
 * DIFFICULTY: Intermediate
 *
 * Two kinds of failure exist:
 *   1. Client-side validation  -> throws synchronously (bad ayanamsa, bad args)
 *   2. API/network failure     -> rejects the returned Promise
 *
 * RUN:
 *   node demo_error_handling.js
 */
import { Calculate, Time, GeoLocation, Ayanamsa } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const birth = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));

  // 1. Successful call
  try {
    const sun = await Calculate.PlanetRasiD1Sign('Sun', birth);
    console.log(`[ok] Sun in ${sun.Name}`);
  } catch (error) {
    console.error(`[fail] ${error.message}`);
  }

  await sleep(12_500);

  // 2. Invalid ayanamsa -> client-side TypeError, no network call made
  try {
    Calculate.SetAyanamsa('NotARealAyanamsa');
  } catch (error) {
    console.log(`[validation] ${error.constructor.name}: ${error.message}`);
  }
  // The bad value was rejected, so the previous setting is untouched
  console.log(`[validation] ayanamsa still: ${Calculate.GetAyanamsa() ?? '(none set)'}`);

  await sleep(12_500);

  // 3. Bad coordinates reach the API and come back as a rejection
  try {
    const impossible = new Time('14:30 25/10/1992 +05:30',
      new GeoLocation('Nowhere', 999, 999));
    const result = await Calculate.PlanetRasiD1Sign('Sun', impossible);
    console.log(`[unexpected] ${JSON.stringify(result)}`);
  } catch (error) {
    console.log(`[api] ${error.message.split('\n')[0]}`);
  }

  // 4. A tiny retry helper for transient failures
  async function withRetry(fn, attempts = 3, delayMs = 12_500) {
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === attempts) throw error;
        console.log(`   retry ${attempt}/${attempts - 1} after: ${error.message.split('\n')[0]}`);
        await sleep(delayMs);
      }
    }
  }

  await sleep(12_500);
  const moon = await withRetry(() => Calculate.PlanetRasiD1Sign('Moon', birth));
  console.log(`[retry ok] Moon in ${moon.Name}`);

  // Ayanamsa is validated, so keep a valid choice for subsequent calls
  Calculate.SetAyanamsa(Ayanamsa.Lahiri);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
