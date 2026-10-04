# Quick start

```sh
npm install vedastro
```

```js
import { Calculate, Time, GeoLocation, PlanetName } from 'vedastro';
Calculate.SetAPIKey('FreeAPIUser');
const birth = new Time('14:30 25/10/1992 +05:30', new GeoLocation('Mumbai', 72.8777, 19.0760));
const sun = await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth);
console.log(`Sun sign: ${sun.Name}`);
```

Run with Node.js 22+. Calls require internet access and the free key allows five requests per minute.
