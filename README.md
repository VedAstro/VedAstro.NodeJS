# VedAstro for Node.js

Official Node.js client for the VedAstro astrology API, with 684 generated calculations and no runtime dependencies.

```sh
npm install vedastro
```

```js
const { Calculate, Time, GeoLocation, PlanetName } = require('vedastro');
Calculate.SetAPIKey('FreeAPIUser');
const birth = new Time('14:30 25/10/1992 +05:30', new GeoLocation('Mumbai', 72.8777, 19.0760));
const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
console.log(sun.Name);
```

ES modules and TypeScript are supported. Each calculation is asynchronous and returns a Promise. Use `Calculate.SetAPIKey(process.env.VEDASTRO_API_KEY)` for a customer key. The free tier allows five calls per minute; see [current pricing](https://vedastro.org/API.html).

Create birth times with `new Time('HH:MM DD/MM/YYYY +/-HH:MM', new GeoLocation(name, longitude, latitude))` or use the object constructor. Ayanamsa defaults to Lahiri. Set it globally with `Calculate.SetAyanamsa(Ayanamsa.Raman)` or scope it safely across concurrent async work:

```js
await Calculate.use_ayanamsa(Ayanamsa.Lahiri, async () => {
  const result = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
});
```

Methods resolve to API JSON payloads; failures reject with an Error. Chart methods returning SVG resolve to strings. An internet connection is required; Node.js 22+ is supported.

Importing prints the Python SDK's ASCII banner and checks for npm updates. When installed in an npm project with `package-lock.json`, a newer package is installed into that project. Restart the process to load it. Set `VEDASTRO_DISABLE_AUTO_UPDATE=1` to disable the check. Run demos with `node demo_quick_start.js`.

MIT licensed. API service: [vedastro.org](https://vedastro.org).
