<h1 align="center">🪐 VedAstro for Node.js</h1>

<p align="center">
  <em>The most comprehensive Vedic astrology library for Node.js — 684 calculations, one <code>await</code> away.</em>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vedastro"><img src="https://img.shields.io/npm/v/vedastro?style=flat-square&color=f6d365&label=npm" alt="npm version"/></a>
  <a href="https://www.npmjs.com/package/vedastro"><img src="https://img.shields.io/npm/dw/vedastro?style=flat-square&color=818cf8&label=Downloads" alt="Downloads"/></a>
  <a href="https://www.npmjs.com/package/vedastro"><img src="https://img.shields.io/node/v/vedastro?style=flat-square&color=a78bfa&label=node" alt="Node version"/></a>
  <a href="https://github.com/VedAstro/VedAstro.NodeJS/blob/main/LICENSE"><img src="https://img.shields.io/github/license/VedAstro/VedAstro.NodeJS?style=flat-square&color=fda085" alt="License"/></a>
  <a href="https://github.com/VedAstro/VedAstro.NodeJS/stargazers"><img src="https://img.shields.io/github/stars/VedAstro/VedAstro.NodeJS?style=flat-square&color=f6d365" alt="Stars"/></a>
</p>

---

### 🎯 Built for Real Apps

Perfect for:
- 📱 **Horoscope mobile & web apps** - Get 200+ life predictions instantly
- 💑 **Marriage matching services** - 16-factor Kuta compatibility analysis
- 📅 **Daily panchanga widgets** - Tithi, Nakshatra, Yoga, Karana
- 🔮 **AI astrology chatbots** - Natural language birth chart queries
- 📊 **Astrological research** - Batch process thousands of charts
- 🌟 **Numerology calculators** - Chaldean system with life aspect scores

**Zero runtime dependencies.** The package ships generated TypeScript declarations, so every one of the 684 methods is autocompleted and type-checked in your editor.

---

## 🏃 Quick Start (3 minutes to your first calculation)

### Installation (10 seconds)
```bash
npm install vedastro
```

**No native builds, no ephemeris files, no system dependencies.** Node.js 22 or newer is required.

### Your First Calculation (20 seconds)
```js
import { Calculate, Time, GeoLocation, PlanetName } from 'vedastro';

// Set API key (use 'FreeAPIUser' for free tier)
Calculate.SetAPIKey('FreeAPIUser');

// Define birth time and location
const birth = new Time('14:30 25/10/1992 +05:30',
  new GeoLocation('Mumbai', 72.8777, 19.0760));

// Get Sun sign (one line!)
const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);

console.log(`Sun Sign: ${sun.Name}`); // Output: "Libra"
```

**That's it! You just made your first Vedic astrology calculation.** 🎉

> **Every calculation is async.** Methods return a `Promise`, so `await` them — no `async function` wrapper needed. Save this file as `.mjs`, or as `.js` in a project whose `package.json` has `"type": "module"`.

<details>
<summary><strong>CommonJS project?</strong></summary>

`require()` and top-level `await` cannot be mixed in one file, so in CommonJS put the `await`s inside an `async` function:

```js
const { Calculate, Time, GeoLocation, PlanetName } = require('vedastro');

async function main() {
  Calculate.SetAPIKey('FreeAPIUser');
  const birth = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));
  const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
  console.log(`Sun Sign: ${sun.Name}`);
}

main();
```
</details>

---

## 📚 Beginner-Friendly Examples

Every snippet below is an ES module and can be pasted straight into a `.mjs` file (or a `.js` file in a project with `"type": "module"`). The `demo_*.js` files in this repository use the same style.

### Example 1: Get Birth Chart Basics

**Use Case:** Display Sun, Moon, and Ascendant signs

```js
import { Calculate, Time, GeoLocation, PlanetName, HouseName } from 'vedastro';

Calculate.SetAPIKey('FreeAPIUser');

const birth = new Time('14:30 25/10/1992 +05:30',
  new GeoLocation('Mumbai', 72.8777, 19.0760));

// Get the big three
const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
const moon = await Calculate.PlanetRasiD1Sign(PlanetName.Moon, birth);
const ascendant = await Calculate.HouseSignName(HouseName.House1, birth);

console.log(`Sun: ${sun.Name}`);      // e.g. "Libra"
console.log(`Moon: ${moon.Name}`);    // e.g. "Scorpio"
console.log(`Rising: ${ascendant}`);  // e.g. "Capricorn"
```

👉 **See full example:** [`demo_birth_chart_basics.js`](demo_birth_chart_basics.js)

---

### Example 2: Marriage Compatibility

**Use Case:** Check if two people are compatible for marriage

```js
import { Calculate, Time, GeoLocation } from 'vedastro';

Calculate.SetAPIKey('FreeAPIUser');

// Person 1
const person1 = new Time('23:40 31/12/1996 +09:00',
  new GeoLocation('Tokyo', 139.83, 35.65));

// Person 2
const person2 = new Time('14:30 15/06/1997 -05:00',
  new GeoLocation('New York', -74.006, 40.7128));

// Get compatibility report (16-factor Kuta analysis)
const match = await Calculate.MatchReport(person1, person2);

console.log(`Compatibility Score: ${match.KutaScore}/100`);
console.log(match.Summary.ScoreSummary);

// Show individual factors
for (const kuta of match.PredictionList.slice(0, 5)) {
  console.log(`  • ${kuta.Name}: ${kuta.Nature}`);
}
```

**Output** (shape and values depend on the two charts):
```
Compatibility Score: 65/100
Good match - Near perfect match, overall happiness
  • Graha Maitram: Good
  • Rajju: Good
  • Nadi Kuta: Good
  • Vasya Kuta: Bad
  • Dina Kuta: Good
```

👉 **See full example:** [`demo_marriage_compatibility.js`](demo_marriage_compatibility.js)

---

### Example 3: Current Planetary Positions

**Use Case:** Get today's planetary positions for any location

```js
import { Calculate, Time, GeoLocation, PlanetName } from 'vedastro';

Calculate.SetAPIKey('FreeAPIUser');

const now = new Date();
const location = new GeoLocation('London', -0.1278, 51.5074);

// Build a Time from the current moment
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
}
```

**Output:**
```
Current Planetary Positions:
  Sun: Taurus in Rohini
  Moon: Sagittarius in Moola
  Mars: Pisces in Revathi
  ...
```

👉 **See full example:** [`demo_current_planets.js`](demo_current_planets.js)

---

### Example 4: Daily Panchanga

**Use Case:** Get today's Tithi, Nakshatra, Yoga and Karana for a location

```js
import { Calculate, Time, GeoLocation } from 'vedastro';

Calculate.SetAPIKey('FreeAPIUser');

const now = new Date();
const location = new GeoLocation('Mumbai', 72.8777, 19.0760);
const today = new Time({
  hour: now.getHours(), minute: now.getMinutes(),
  day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear(),
  offset: '+05:30', geolocation: location
});

// The 5 limbs of Panchanga
const tithi = await Calculate.LunarDay(today);
const nakshatra = await Calculate.MoonConstellation(today);
const yoga = await Calculate.NithyaYoga(today);
const karana = await Calculate.Karana(today);

console.log(`Tithi:     ${tithi}`);       // e.g. "Shukla Dwadashi"
console.log(`Nakshatra: ${nakshatra}`);   // e.g. "Pushya"
console.log(`Yoga:      ${yoga}`);        // e.g. "Ganda"
console.log(`Karana:    ${karana}`);      // e.g. "Vishti"
```

**Output:**
```
Tithi:     Shukla Dwadashi
Nakshatra: Pushya
Yoga:      Ganda
Karana:    Vishti
```

👉 **See full example:** [`demo_daily_panchanga.js`](demo_daily_panchanga.js)

---

### Example 5: Vimshottari Dasa Timeline

**Use Case:** Get planetary periods (Mahadasa → Bhukti → Antaram)

```js
import { Calculate, Time, GeoLocation } from 'vedastro';

Calculate.SetAPIKey('FreeAPIUser');

const mumbai = new GeoLocation('Mumbai', 72.8777, 19.0760);
const birth = new Time('14:30 25/10/1992 +05:30', mumbai);

const start = new Time('00:00 01/01/2020 +05:30', mumbai);
const end = new Time('23:59 31/12/2030 +05:30', mumbai);

// levels = nesting depth, precisionHours = how finely to scan
const dasa = await Calculate.DasaAtRange(birth, start, end, 3, 100);

console.log(JSON.stringify(dasa, null, 2));
```

👉 **See full example:** [`demo_vimshottari_dasa.js`](demo_vimshottari_dasa.js)

---

### Example 6: Numerology Calculator

**Use Case:** Get Chaldean numerology analysis for a name

```js
import { Calculate, Time, GeoLocation } from 'vedastro';

Calculate.SetAPIKey('FreeAPIUser');

const name = 'John Doe';
const dob = new Time('14:30 25/10/1992 +05:30',
  new GeoLocation('Mumbai', 72.8777, 19.0760));

// Numbers taken from the birth date
console.log('Birth number:  ', await Calculate.BirthNumber(dob));
console.log('Destiny number:', await Calculate.DestinyNumber(dob));

// Name number (Chaldean system), with ruling planet and interpretation
const prediction = await Calculate.NameNumberPrediction(name);
console.log(`${name}: number ${prediction.Number} `
  + `(root ${prediction.RootNumber}, ruling planet ${prediction.Planet})`);

// 'Prediction' is HTML-formatted, so strip tags for plain terminal text
console.log(prediction.Prediction.replace(/<[^>]+>/g, ''));
```

**Output:**
```
Birth number:   7
Destiny number: 2
John Doe: number 34 (root 7, ruling planet Ketu)
This number has the potential to be seen as lucky, ...
```

`Prediction` is HTML-formatted interpretation text — render it in a DOM node, or strip the tags before display.

👉 **See full example:** [`demo_numerology_calculator.js`](demo_numerology_calculator.js)

---

### Example 7: Semantic Search of Classical Texts (RAG)

**Use Case:** Ask a plain-English question and get the most relevant passages from classical Vedic books (BPHS, Phaladeepika, Hindu Predictive Astrology, …) — no exact keywords needed

```js
import { Calculate } from 'vedastro';

Calculate.SetAPIKey('FreeAPIUser');

// See which classical texts are searchable
console.log(await Calculate.GetAvailableSourceTexts());

// Natural-language semantic search across all texts
const passages = await Calculate.SearchSourceText('effects of Saturn in the 7th house');

for (const p of passages) {
  // lower score = closer match -> convert to a relevance %
  const relevance = (1 - (p.score ?? 1)) * 100;
  console.log(`${p.sourceName} p.${p.pageNumber} (${relevance.toFixed(0)}%)`);
  console.log(`   ${p.text}\n`);
}

// Narrow to one book and tune the knobs (positional: query, topK, sourceName, contextSize)
const focused = await Calculate.SearchSourceText(
  'results of Jupiter aspecting the Moon',
  3,
  'Hindu-Predictive-Astrology',
  800
);
```

> 🤖 This is the same retrieval step that powers VedAstro's RAG/AI features — feed the returned passages into an LLM prompt to build a **cited** astrology chatbot.

👉 **See full example:** [`demo_rag_vedic_books.js`](demo_rag_vedic_books.js)

---

## 🎓 Step-by-Step Tutorials

### Tutorial 1: Understanding Time Format

**The Most Common Beginner Issue: Time Format**

**Format:** `"HH:MM DD/MM/YYYY +TZ:TZ"`

| Location | Example | Timezone Offset |
|----------|---------|-----------------|
| India | `"14:30 25/10/1992 +05:30"` | IST = UTC+5:30 |
| USA (East) | `"09:30 25/10/1992 -05:00"` | EST = UTC-5:00 |
| USA (West) | `"06:30 25/10/1992 -08:00"` | PST = UTC-8:00 |
| Japan | `"23:30 25/10/1992 +09:00"` | JST = UTC+9:00 |
| UK | `"14:30 25/10/1992 +00:00"` | GMT = UTC+0:00 |
| Australia | `"00:30 26/10/1992 +10:00"` | AEST = UTC+10:00 |

**Two Ways to Create Time:**

```js
import { Time, GeoLocation } from 'vedastro';

const mumbai = new GeoLocation('Mumbai', 72.8777, 19.0760);

// Method 1: String format (easiest for beginners)
const time1 = new Time('14:30 25/10/1992 +05:30', mumbai);

// Method 2: Object constructor (explicit, and easy to feed a Date)
const time2 = new Time({
  hour: 14, minute: 30,
  day: 25, month: 10, year: 1992,
  offset: '+05:30',
  geolocation: mumbai
});

// Both are equivalent!
```

**Common Mistakes:**

```js
// ❌ Wrong - date format must be DD/MM/YYYY
new Time('14:30 1992-10-25 +05:30', mumbai);

// ❌ Wrong - AM/PM is not supported (use 24-hour)
new Time('2:30 PM 25/10/1992 +05:30', mumbai);

// ❌ Wrong - missing timezone offset
new Time('14:30 25/10/1992', mumbai);

// ✅ Correct
new Time('14:30 25/10/1992 +05:30', mumbai);
```

> `GeoLocation` takes **`(name, longitude, latitude)`** in that order. A swapped pair is the second most common bug — it silently produces a plausible but wrong chart.

---

### Tutorial 2: Choosing the Right Ayanamsa

**What is Ayanamsa?**

Ayanamsa is the difference between tropical (Western) and sidereal (Vedic) zodiacs. Different ayanamsa systems can shift planet positions by up to ~3°, so a planet near a sign boundary can change sign.

**47 Systems Available:**

| System | When to Use |
|--------|-------------|
| **Lahiri** | Indian government standard, most widely used — **the API default when none is set** |
| **Raman** | Popular in South India |
| **Krishnamurti** | KP (Krishnamurti Paddhati) system |
| **Fagan_Bradley** | Western sidereal astrology |
| **Yukteshwar** | Sri Yukteswar's calculation |
| …42 more | See full list at [vedastro.org/API.html](https://vedastro.org/API.html) |

**How to Switch:**

```js
import { Calculate, Time, GeoLocation, Ayanamsa } from 'vedastro';

Calculate.SetAPIKey('FreeAPIUser');

const birth = new Time('14:30 25/10/1992 +05:30',
  new GeoLocation('Mumbai', 72.8777, 19.0760));

// Nothing set: the API applies its own default, which measures as Lahiri
console.log(Calculate.GetAyanamsa());                                    // undefined
console.log((await Calculate.AyanamsaDegree(birth)).DegreeMinuteSecond); // 23° 45' 39

// Set it for the rest of the process
Calculate.SetAyanamsa(Ayanamsa.Raman);
console.log((await Calculate.AyanamsaDegree(birth)).DegreeMinuteSecond); // 22° 18' 2

// ...or scope it — safe across concurrent async work, reverts on exit
await Calculate.use_ayanamsa(Ayanamsa.Krishnamurti, async () => {
  console.log((await Calculate.AyanamsaDegree(birth)).DegreeMinuteSecond); // 23° 39' 52

  // Any calculation inside this block uses the scoped ayanamsa too
  const sun = await Calculate.PlanetRasiD1Sign('Sun', birth);
});

console.log(Calculate.GetAyanamsa());                                    // Raman again
```

**Why `use_ayanamsa` exists:** Node.js is concurrent, so a "current ayanamsa" global is unsafe when two requests overlap. `use_ayanamsa` stores the value in an [`AsyncLocalStorage`](https://nodejs.org/api/async_hooks.html) context, so two overlapping `await` chains can each use a different ayanamsa without interfering.

**Recommendation:**
- 🇮🇳 **Indian astrology** → `Ayanamsa.Lahiri`
- 🌏 **API default** → `Ayanamsa.Lahiri` (measured server default)
- 📐 **KP system** → `Ayanamsa.Krishnamurti`
- 🌍 **Western sidereal** → `Ayanamsa.Fagan_Bradley`

---

### Tutorial 3: Interpreting Match Reports

**Understanding Kuta Score:**

| Score Range | Compatibility | Recommendation |
|-------------|--------------|----------------|
| 33-36 points | Excellent | Highly compatible |
| 25-32 points | Good | Compatible, proceed with confidence |
| 18-24 points | Average | Requires careful consideration |
| Below 18 | Poor | Not recommended without other factors |

**The 16 Kutas Explained:**

1. **Graha Maitram (5 pts)** - Mental compatibility, happiness
2. **Gana (6 pts)** - Temperament match (Deva/Manushya/Rakshasa)
3. **Yoni (4 pts)** - Sexual compatibility
4. **Nadi (8 pts)** - Health & progeny (most important!)
5. **Varna (1 pt)** - Spiritual/ego compatibility
6. …and 11 more factors

**Reading the Report:**

```js
const match = await Calculate.MatchReport(person1, person2);

console.log(match.KutaScore);                  // e.g. 65 (normalised to 100)
console.log(match.Summary.ScoreSummary);       // e.g. "Near perfect match, overall happiness"

for (const kuta of match.PredictionList) {
  console.log(`${kuta.Name}: ${kuta.Nature}`); // Good / Bad / Neutral
  console.log(`  Info: ${kuta.Info}`);
}
```

---

## 🔧 Common Use Cases & Demo Files

| Demo File | Use Case | Skill Level |
|-----------|----------|-------------|
| [`demo_quick_start.js`](demo_quick_start.js) | Absolute simplest example | Beginner |
| [`demo_birth_chart_basics.js`](demo_birth_chart_basics.js) | Sun/Moon/Ascendant signs | Beginner |
| [`demo_marriage_compatibility.js`](demo_marriage_compatibility.js) | Full match report with interpretation | Beginner |
| [`demo_current_planets.js`](demo_current_planets.js) | Today's planetary positions | Beginner |
| [`demo_daily_panchanga.js`](demo_daily_panchanga.js) | Tithi, Nakshatra, Yoga, Karana | Beginner |
| [`demo_numerology_calculator.js`](demo_numerology_calculator.js) | Birth, destiny and name numbers | Beginner |
| [`demo_vimshottari_dasa.js`](demo_vimshottari_dasa.js) | Planetary periods timeline | Intermediate |
| [`demo_custom_ayanamsa.js`](demo_custom_ayanamsa.js) | Switching between the 47 systems | Intermediate |
| [`demo_divisional_charts.js`](demo_divisional_charts.js) | D9, D10, D12 varga charts | Intermediate |
| [`demo_svg_charts.js`](demo_svg_charts.js) | Render North/South Indian chart SVGs | Intermediate |
| [`demo_all_astro_data.js`](demo_all_astro_data.js) | Dump full planet/house datasets to JSON | Intermediate |
| [`demo_error_handling.js`](demo_error_handling.js) | Validation errors, API failures, retries | Intermediate |
| [`demo_rag_vedic_books.js`](demo_rag_vedic_books.js) | Semantic search of classical Vedic texts (RAG) | Intermediate |
| [`demo_typescript.ts`](demo_typescript.ts) | Typed usage with the bundled declarations | Intermediate |
| [`demo_batch_processing.js`](demo_batch_processing.js) | Process many charts within rate limits | Advanced |

Run any of them directly:

```bash
node demo_quick_start.js
```

> Demos are ES modules and pace their calls so the free tier's 5 calls/minute limit doesn't reject them. A few make several calls, so they deliberately take a minute or two.

---

## 🐛 Troubleshooting & FAQ

### Q: "I'm getting rate limit errors"

**A:** The free tier allows 5 requests per minute. Solutions:

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Solution 1: Pace your requests (12s+ between calls = 5 req/min)
for (const planet of ['Sun', 'Moon', 'Mars']) {
  const sign = await Calculate.PlanetRasiD1Sign(planet, birth);
  console.log(`${planet}: ${sign.Name}`);
  await sleep(12_500);
}

// Solution 2: Upgrade to premium (200 calls/minute)
Calculate.SetAPIKey(process.env.VEDASTRO_API_KEY); // No more free-tier limits
```

**Solution 3 (best for real apps):** request your own paid key. The API reports its own limits in the error message, so treat [vedastro.org/API.html](https://vedastro.org/API.html) as the authority.

---

### Q: "`ReferenceError: Cannot determine intended module format`"

**A:** A file cannot mix `require()` with top-level `await`. Pick one style:

```js
// ✅ ES module: use import, and top-level await works directly
import { Calculate } from 'vedastro';
const sun = await Calculate.PlanetRasiD1Sign('Sun', birth);
```

```js
// ✅ CommonJS: use require, and wrap the awaits in an async function
const { Calculate } = require('vedastro');
async function main() {
  const sun = await Calculate.PlanetRasiD1Sign('Sun', birth);
}
```

Node must guess the module format when a file has no `.mjs` extension and its `package.json` lacks `"type": "module"` — that is where this error comes from. Naming the file `.mjs`, or setting `"type": "module"`, removes the ambiguity (and the warning). **This package sets `"type": "module"` for its own files, so the demos here are ES modules.**

---

### Q: "Time format errors — what am I doing wrong?"

**A:** Use format: `"HH:MM DD/MM/YYYY +TZ:TZ"` (24-hour, DD/MM/YYYY order)

```js
// ✅ Correct examples
new Time('14:30 25/10/1992 +05:30', location);  // 2:30 PM IST
new Time('09:00 01/01/2000 -05:00', location);  // 9 AM EST
new Time('23:45 15/08/1985 +09:00', location);  // 11:45 PM JST

// ❌ Wrong examples
new Time('2:30 PM 25/10/1992 +05:30', location); // No AM/PM
new Time('14:30 1992-10-25 +05:30', location);   // Wrong date format
new Time('14:30 25/10/1992', location);          // Missing timezone
```

---

### Q: "Which ayanamsa should I use?"

**A:** Quick guide:

- 🇮🇳 **You're in India** → `Ayanamsa.Lahiri` (govt standard)
- 🌐 **You're unsure** → `Ayanamsa.Lahiri` (API default)
- 📐 **You use KP** → `Ayanamsa.Krishnamurti`
- 🌍 **You're Western sidereal** → `Ayanamsa.Fagan_Bradley`

```js
Calculate.SetAyanamsa(Ayanamsa.Lahiri); // Most common choice
```

---

### Q: "The API rejected my call — why?"

**A:** Common causes:

1. **Invalid API key** → Use `'FreeAPIUser'` for free tier
2. **Wrong time format** → Use `"HH:MM DD/MM/YYYY +TZ:TZ"`
3. **Invalid coordinates** → Latitude: -90 to 90, Longitude: -180 to 180
4. **Rate limit exceeded** → Wait 60 seconds, or use a paid key

```js
try {
  const sun = await Calculate.PlanetRasiD1Sign('Sun', birth);
  console.log(sun.Name);
} catch (error) {
  // Rejections carry the API's own message
  console.error(`Error: ${error.message}`);
}
```

Failures reject the Promise with an `Error` whose message includes the HTTP status, the API's `Payload` error text, a malformed-JSON notice, or a timeout notice. Chart methods that return SVG resolve to a `string` instead of an object.

---

### Q: "Is there a request timeout?"

**A:** No, and that is deliberate. A VedAstro calculation can take milliseconds or minutes depending
on the endpoint and the load on the service, and this library has no way to know what is acceptable
for your workload. A built-in deadline would be exactly the kind of brittle logic that silently
truncates a valid answer, so **none is applied**. If a call is still pending, it is still working.

When you want a deadline — because your own request or job budget demands one — set it explicitly:

```js
const { Calculate } = require('vedastro');

// Only because *you* decided 30 seconds is too long.
Calculate.SetTimeout(30_000);
console.log(Calculate.GetTimeout()); // 30000

Calculate.SetTimeout(null);          // remove it again
```

`SetTimeout` takes milliseconds and rejects a non-positive value. This pairs naturally with
`AbortSignal.timeout(...)` or your framework's own request deadline, which is usually the better
place to express the limit.

---

### Q: "What's the difference between longitude and degree?"

**A:**

- **Nirayana longitude** → 0-360° continuous across the zodiac (e.g., 217.45°)
- **Degree** → 0-30° within the current sign (e.g., 7° 27' Scorpio)

```js
const longitude = await Calculate.PlanetNirayanaLongitude('Sun', birth);
// e.g. 217.45 (continuous)

const sun = await Calculate.PlanetRasiD1Sign('Sun', birth);
console.log(sun.DegreesIn.DegreeMinuteSecond);
// e.g. "7° 27' 15" (within the sign)
```

---

### Q: "Why does importing the package print a banner and hit the network?"

**A:** The package mirrors the Python client by printing `VedAstro : Easy To Use Advanced Astrology Engine` on import, and then checks npm for a newer version in the background.

- The check only runs when the package is installed inside a project that has a `package-lock.json`.
- If a newer version exists, it installs it into that project; **restart your process** to load it.
- Disable the check entirely with `VEDASTRO_DISABLE_AUTO_UPDATE=1`.

```bash
VEDASTRO_DISABLE_AUTO_UPDATE=1 node server.js
```

For serverless/edge runtimes, set that variable — the banner still prints, but no network call or child `npm install` is attempted.

---

### Q: "Can I use this commercially?"

**A:** **Yes!** Both free and premium tiers allow commercial use. MIT license.

- ✅ Build and sell horoscope apps
- ✅ Offer paid astrology services
- ✅ Use in commercial websites
- ✅ Integrate into SaaS products

No attribution required (but appreciated!).

---

### Q: "What's included in free vs premium?"

**A:** **All 684 calculations included in both!** The difference is throughput:

| Feature | Free | Premium |
|---------|------|---------|
| All calculations | ✅ | ✅ |
| All 47 ayanamsa | ✅ | ✅ |
| Commercial use | ✅ | ✅ |
| Swiss Ephemeris | ✅ | ✅ |
| Rate limit | 5 req/min | 200 req/min |
| Cost | $0/month | $1/month |

> The API's own rate-limit error quotes **200 calls/minute** for premium keys. Pricing and limits are set by the service, so confirm current numbers at [vedastro.org/API.html](https://vedastro.org/API.html).

---

### Q: "How do I get a premium API key?"

**A:**

1. Go to [vedastro.org/API.html](https://vedastro.org/API.html)
2. Choose a plan: $1/month or ₹758/year (India)
3. Pay via card, UPI, Google Pay or PayPal
4. Get your API key instantly from [vedastro.org/Account.html](https://vedastro.org/Account.html)

```js
Calculate.SetAPIKey(process.env.VEDASTRO_API_KEY);
// Now higher-rate requests!
```

> Set the key **once at startup**, before your first calculation. The key is attached to every request body, so never ship it in client-side browser code — call the API from your server and keep the key in an environment variable.

---

## 🚀 Why VedAstro? The Simplest & Most Affordable Vedic Astrology API

### ✨ Unbeatable Value

| What You Get | VedAstro | Competitors |
|--------------|----------|-------------|
| **Monthly Cost** | **$1/month** | $50-$200/month |
| **Free Tier** | ✅ 5 req/min | ❌ None or very limited |
| **Calculations** | **684 methods** | 50-200 methods |
| **Ayanamsa Systems** | **47 systems** | 3-10 systems |
| **Setup Complexity** | **Zero setup** | Complex (DLLs, ephemeris files) |
| **Commercial Use** | ✅ Both tiers | ❌ Enterprise only |

**The Bottom Line:** Get 10x more features at 1/50th the price. No credit card needed to start.

### 💰 Pricing That Makes Sense

| Tier | Price | Rate Limit | Best For |
|------|-------|------------|----------|
| **Free** | $0/month | 5 req/min | Learning, testing, personal projects |
| **Premium** | **$1/month** | 200 req/min | Production apps, commercial use |

**Indian Developers:** ₹79/month or ₹758/year (₹63/month, most popular)

> **All 684 calculations included in both tiers.** The only difference is throughput.

---

## 📖 What Can You Calculate? (684 Methods)

**Full API reference:** [vedastro.org/API.html](https://vedastro.org/API.html)

Methods are grouped below by area. Every one of them is `async` and typed in [`src/generated/calculate.d.ts`](src/generated/calculate.d.ts).

### Core chart analysis (225 methods)
`PlanetRasiD1Sign`, `PlanetNirayanaLongitude`, `PlanetConstellation`, `PlanetsInSign`, `PlanetsInConjunction`, `IsPlanetRetrograde`, `IsPlanetExalted`, `IsPlanetDebilitated`, `HouseSignName`, `HouseRasiSign`, `LordOfHouse`, `AllPlanetData`, `AllHouseData`, `AllZodiacSignData`, +211 more

### Divisional charts — vargas (102 methods)
`AllHouseNavamshaSign` (D9), `AllHouseDrekkanaSign` (D3), `AllHouseChaturthamsaSign` (D4), `PlanetShashtyamshaD60Sign` (D60), `PlanetDivisionalLongitude`, D1-D60 vargas

### Panchanga, muhurta & time (65 methods)
`LunarDay`, `TithiNumber`, `NakshatraPada`, `NithyaYoga`, `Karana`, `RahuKala`, `GulikaKala`, `Durmuhurta`, `SunriseTime`, `SunsetTime`, `HoraTable`, `AyanamsaDegree`, `PlanetEphemerisLongitude`, +51 more

### Strength, dignity & Shadbala (62 methods)
`PlanetShadbalaPinda`, `PlanetStrength`, `HouseStrength`, `PlanetIshtaScore`, `PlanetKashtaScore`, `AllPlanetOrderedByStrength`, `PickOutStrongestPlanet`, `PlanetDignity`, `IsPlanetVargottama`, +53 more

### Charts, aspects & events (55 methods)
`NorthIndianChart`, `SouthIndianChart`, `SkyChart`, `PlanetAspectDegree`, `PlanetsAspectingPlanet`, `IsPlanetAspectedByPlanet`, `EventsAtTime`, `EventsAtRange`, `EventStartTime`, `HoroscopePredictions`, `SwissEphemeris`, +44 more

### Prashna, chakra & Pancha Pakshi (28 methods)
`Chapter5PrashnaMargaPredictions` … `Chapter30PrashnaMargaPredictions`, `SarvatobhadraChakra`, `KotaChakra`, `SudarsanaChakra`, `BirthYamaPanchaPakshi`, `CalculateAshtamangalaNumberFromShells`, +few more

### Ashtakvarga (20 methods)
`SarvashtakavargaChart`, `BhinnashtakavargaChart`, `PlanetAshtakvargaBindu`, `GocharaKakshas`, `AshtakavargaLongevity`, `PrastaraAshtakavarga`, `SodyaAshtakavarga`, +13 more

### Dasa — planetary periods (20 methods)
`DasaAtRange`, `DasaAtTime`, `DasaForNow`, `DasaForLife`, `MoolaDasa`, `NarayanaDasa`, `KalachakraDasa`, `TithiAshtottariDasa`, +12 more

### Earthquake research (20 methods)
`CalculateEarthquakeRiskScore`, `IsEarthquakeNearEclipse`, `IsEarthquakeJupiterSaturnConjunction`, `IsEarthquakePlanetsClusteredInNarrowArc`, +16 more

### Longevity & life events (18 methods)
`DetailedAshtakavargaLongevity`, `MarriageByJupiter`, `ChildBirthByJupiter1`, `NativeDeathBySaturn`, `HasBalarishtaExceptions`, `MarakaPlanetList`, +12 more

### Upagraha & special points (15 methods)
`GulikaLongitude`, `MaandiLongitude`, `DhumaLongitude`, `UpaketuLongitude`, `KaalaLongitude`, `FortunaPoint`, `DestinyPoint`, `IsUpagraha`, +7 more

### Transit & timing — gochara (13 methods)
`PlanetSignTransit`, `TransitHouseFromLagna`, `TransitHouseFromMoon`, `IsGocharaOccurring`, `GetConstellationTransitStartTime`, `IsPlanetRetrograde`, +7 more

### Yogas, doshas & kartari (12 methods)
`KalaSarpaYoga`, `JHoraYogaList`, `IsPlanetInGandanta`, `KujaDosaScore`, `ClassifyForKartari`, `ShubKartariPlanets`, `PaapaKartariPlanets`, +5 more

### Jaimini & Tajika (8 methods)
`JaiminiRasiDrishti`, `JaiminiRasiStrength`, `TajakaVarshaphala`, `TajakaYogaList`, `TrueSiderealSolarReturn`, `ArudhaLagnaSign`, +2 more

### AI, ML & text search (7 methods)
`FindBirthTimeByMachineLearning`, `FindBirthTimeByMachineLearningTopK`, `FindBirthTimeByAnimal`, `SearchSourceText` (RAG over classical texts), `GetAvailableSourceTexts`, `HoroscopePredictionsForLargeAstrologyModelTrainingData`, +1 more

### Numerology (6 methods)
`BirthNumber`, `DestinyNumber`, `NameNumber`, `NameNumberPrediction`, `RootNumberFriendship`, `MainActivity`

### Compatibility & matching (4 methods)
`MatchReport`, `Tarabala`, `Chandrabala`, `YoniKutaAnimal`

### Health & nature scores (4 methods)
`PredictMedicalHealthConditions`, `HouseNatureScore`, `PlanetNatureScore`, `GetActiveNccBodyRulesAtTime`

---

## 🎯 Next Steps

1. **Install**: `npm install vedastro` (10 seconds)
2. **Try the examples above**: copy, paste, run! (5 minutes)
3. **Explore demos**: `node demo_quick_start.js` (30 minutes)
4. **Go typed**: `import type { Calculate } from 'vedastro'` in a `.ts` file
5. **Build something**: your first horoscope app! (1-2 hours)
6. **Upgrade when ready**: [vedastro.org/API.html](https://vedastro.org/API.html)

---

## 💡 Why Developers Love VedAstro

> "I was paying $150/month for a competing API. VedAstro is $1/month with more features and better docs. Absolute no-brainer." — Rahul, India

> "Setup took 2 minutes. First calculation worked immediately. No configuration hell. This is how all APIs should be." — Sarah, USA

> "684 calculations, 47 ayanamsas, Swiss Ephemeris accuracy, $1/month. I thought there was a catch. There isn't." — Yuki, Japan

> "The free tier is generous enough for my personal app with 50 users. When I scale up, $1/month won't break the bank." — Carlos, Brazil

---

## 🏗️ How It Works (Architecture)

```
Your Node.js Code
      v
vedastro npm package (this package)
      v
REST API (vedastro.zaishi.net)
      v
VedAstro Engine (Azure Cloud)
      v
Swiss Ephemeris (NASA JPL data)
```

The npm package is a thin, typed client: it builds the request body, posts it, unwraps the standard `{ Status, Payload }` envelope, and surfaces the inner payload. Calculations themselves run on VedAstro's servers.

It is an **ES module first** (`"type": "module"`) and still ships a CommonJS build, so `require('vedastro')` keeps working in older projects.

**Why cloud-powered?**
- ✅ Zero local dependencies (no native modules, no ephemeris downloads)
- ✅ Instant updates (684 calculations, always latest)
- ✅ Tiny install (no C++ toolchain, no `node-gyp`)
- ✅ No setup complexity (works on Windows/Mac/Linux)
- ✅ Scales automatically (handles any load)

---

## 🤝 Contributing

Contributions are welcome — issues and PRs at [VedAstro.NodeJS](https://github.com/VedAstro/VedAstro.NodeJS).

> **Note:** everything in `src/generated/` is auto-generated by [StaticTableGenerator](https://github.com/VedAstro/VedAstro) in the main repo. Do not edit those files directly; regenerate and re-run `npm run build && npm run check`.

---

## 📄 License

MIT License - Use freely in commercial and personal projects.

---

## 🙏 Support the Project

VedAstro is non-profit and user-funded. If it saves you time and money:

- ⭐ **Star on GitHub** (helps others discover us)
- 💰 **Subscribe $1/month** at [vedastro.org/API.html](https://vedastro.org/API.html)
- 🎁 **Donate** at [vedastro.org/Donate](https://vedastro.org/Donate)
- 📢 **Share** with other developers

Every subscription helps keep VedAstro free and open-source! 🙏

---

## 📚 Additional Resources

- 📖 **Full API Docs**: [vedastro.org/API.html](https://vedastro.org/API.html)
- 🚀 **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- ❓ **FAQ**: [FAQ.md](FAQ.md)
- 📦 **npm package**: [npmjs.com/package/vedastro](https://www.npmjs.com/package/vedastro)
- 🐍 **Python version**: [VedAstro.Python](https://github.com/VedAstro/VedAstro.Python)
- 💬 **Telegram**: [t.me/vedastro_org](https://t.me/vedastro_org)
- 🐛 **Issues**: [GitHub Issues](https://github.com/VedAstro/VedAstro.NodeJS/issues)
- 🌐 **Website**: [vedastro.org](https://vedastro.org)

---

<p align="center">
  <strong>Made with ❤️ by users, for users</strong><br>
  <a href="https://vedastro.org">Website</a> •
  <a href="https://vedastro.org/API.html">API Docs</a> •
  <a href="https://github.com/VedAstro/VedAstro">GitHub</a> •
  <a href="https://t.me/vedastro_org">Telegram</a> •
  <a href="https://vedastro.org/Donate">Donate</a>
</p>

<p align="center">
  <em>🪐 Empowering developers to build amazing astrology apps since 2020</em>
</p>
