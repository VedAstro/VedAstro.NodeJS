const { Calculate, Time, GeoLocation, PlanetName, Ayanamsa } = require('vedastro');
Calculate.SetAPIKey('FreeAPIUser');
const birth = new Time('23:40 31/12/2010 +08:00', new GeoLocation('Tokyo, Japan', 139.83, 35.65));
for (const ayanamsa of [Ayanamsa.Lahiri, Ayanamsa.Raman]) {
  await Calculate.use_ayanamsa(ayanamsa, async () => {
    console.log(ayanamsa, await Calculate.PlanetRasiD1Sign(PlanetName.Sun, birth));
  });
  await new Promise(resolve => setTimeout(resolve, 12_500));
}
