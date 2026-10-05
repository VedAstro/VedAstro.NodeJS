# Quick start

Requires **Node.js 22 or newer**.

```sh
npm install vedastro
```

Save this as `index.mjs` (ES module):

```js
import { Calculate, Time, GeoLocation, PlanetName } from 'vedastro';

// 'FreeAPIUser' is the free-tier key (5 requests per minute).
// For a paid key: Calculate.SetAPIKey(process.env.VEDASTRO_API_KEY)
Calculate.SetAPIKey('FreeAPIUser');

// Time format: "HH:MM DD/MM/YYYY +TZ:TZ"
// GeoLocation takes (name, longitude, latitude) — in that order.
const birth = new Time('14:30 25/10/1992 +05:30',
  new GeoLocation('Mumbai', 72.8777, 19.0760));

const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
console.log(`Sun sign: ${sun.Name}`); // "Libra"
```

Run it:

```sh
node index.mjs
```

Every calculation is `async`, so top-level `await` works directly — no wrapper function. Name the file `.js` instead if your `package.json` sets `"type": "module"`.

## CommonJS project?

`require()` cannot be combined with top-level `await`, so wrap the calls:

```js
const { Calculate, Time, GeoLocation, PlanetName } = require('vedastro');

async function main() {
  Calculate.SetAPIKey('FreeAPIUser');
  const birth = new Time('14:30 25/10/1992 +05:30',
    new GeoLocation('Mumbai', 72.8777, 19.0760));
  const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
  console.log(`Sun sign: ${sun.Name}`);
}

main().catch(error => console.error(error.message));
```

## Next steps

- Runnable demos: `node demo_quick_start.js`, then browse the [demo list](README.md#-common-use-cases--demo-files)
- Failures reject with an `Error` whose message carries the API's own error text
- All 684 methods and 47 ayanamsa systems: [README](README.md)
- Common problems: [FAQ](FAQ.md)
