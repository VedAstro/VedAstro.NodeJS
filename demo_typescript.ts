/**
 * DEMO: TypeScript Usage
 * USE CASE: Get full type-safety and autocompletion from the bundled types
 * DIFFICULTY: Intermediate
 *
 * The package ships generated declarations for all 684 methods, so editors
 * autocomplete method names, argument names and enum values.
 *
 * This file is an ES module (the package sets "type": "module"), so it stays
 * consistent with the .js demos next to it.
 *
 * RUN:
 *   npx tsc --noEmit demo_typescript.ts --module nodenext --moduleResolution nodenext --target es2022
 *
 * To execute it, Node 22+ can strip the types directly:
 *   node --experimental-strip-types demo_typescript.ts
 */
import { Calculate, Time, GeoLocation, PlanetName, Ayanamsa } from 'vedastro';
import type { JsonValue } from 'vedastro';

async function main(): Promise<void> {
  Calculate.SetAPIKey('FreeAPIUser');

  const birth: Time = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));

  // The compiler knows PlanetName.Sun is valid and typo'd members are not.
  const sun: JsonValue = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);

  // Payload methods return JsonValue, so narrow before reading fields.
  const name = (sun as { Name?: string }).Name ?? 'unknown';
  console.log(`Sun Sign: ${name}`);

  // Ayanamsa members are also typed
  Calculate.SetAyanamsa(Ayanamsa.Lahiri);
  console.log(`Ayanamsa: ${Calculate.GetAyanamsa() ?? '(none set)'}`);

  // use_ayanamsa preserves the callback's return type
  const degree = await Calculate.use_ayanamsa(Ayanamsa.Raman, async () => {
    const result = await Calculate.AyanamsaDegree(birth) as { DegreeMinuteSecond?: string };
    return result.DegreeMinuteSecond ?? '';
  });
  console.log(`Raman ayanamsa: ${degree}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
});
