/**
 * DEMO: Marriage Compatibility (Kuta system)
 * USE CASE: Check two people's compatibility with the 16-factor Kuta analysis
 * DIFFICULTY: Beginner
 *
 * RUN:
 *   node demo_marriage_compatibility.js
 */
import { Calculate, Time, GeoLocation } from 'vedastro';

try {
  Calculate.SetAPIKey('FreeAPIUser');

  const person1 = new Time('23:40 31/12/1996 +09:00',
    new GeoLocation('Tokyo', 139.83, 35.65));
  const person2 = new Time('14:30 15/06/1997 -05:00',
    new GeoLocation('New York', -74.006, 40.7128));

  console.log('Calculating compatibility... (this may take a few seconds)\n');

  const match = await Calculate.MatchReport(person1, person2);

  // KutaScore is normalised to 100 (the classical total is 36 points).
  console.log(`Overall Compatibility: ${match.KutaScore}/100`);
  console.log(`Status: ${match.Summary.ScoreSummary}\n`);

  console.log('16-Factor Kuta Analysis:\n');
  for (const kuta of match.PredictionList) {
    const mark = kuta.Nature === 'Good' ? '[ok]'
      : kuta.Nature === 'Bad' ? '[x]' : '[!]';
    console.log(`${mark} ${kuta.Name}: ${kuta.Nature}`);
    console.log(`   ${kuta.Info}\n`);
  }

  // INTERPRETING THE SCORE (classical 36-point scale)
  //   33-36  excellent   25-32  good
  //   18-24  average     < 18   poor
  // Nadi Kuta (health & progeny) is traditionally the most heavily weighted.
  // A low score indicates challenges, not destiny — treat it as one input.
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
