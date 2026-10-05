/**
 * DEMO: Custom Ayanamsa
 * USE CASE: Compare the same chart under different ayanamsa systems
 * DIFFICULTY: Intermediate
 *
 * WHY use_ayanamsa: Node.js is concurrent. A plain global would leak between
 * overlapping requests; use_ayanamsa scopes the value with AsyncLocalStorage.
 *
 * RUN:
 *   node demo_custom_ayanamsa.js
 */
import { Calculate, Time, GeoLocation, Ayanamsa } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const birth = new Time('23:40 31/12/2010 +08:00',
    new GeoLocation('Tokyo, Japan', 139.83, 35.65));

  const none = Calculate.GetAyanamsa();
  console.log(`Default ayanamsa: ${none ?? '(none set — API default measures as Lahiri)'}`);
  console.log(`Default degree:   ${(await Calculate.AyanamsaDegree(birth)).DegreeMinuteSecond}`);

  for (const ayanamsa of [Ayanamsa.Lahiri, Ayanamsa.Raman]) {
    await sleep(12_500);
    await Calculate.use_ayanamsa(ayanamsa, async () => {
      const degree = (await Calculate.AyanamsaDegree(birth)).DegreeMinuteSecond;
      console.log(`${ayanamsa}: ${degree}`);
    });
  }

  // The scoped value is gone once the callback returns.
  console.log(`After scopes:     ${Calculate.GetAyanamsa() ?? '(none set)'}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
