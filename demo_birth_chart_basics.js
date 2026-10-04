const { Calculate, Time, GeoLocation, PlanetName, HouseName } = require('vedastro');
Calculate.SetAPIKey('FreeAPIUser');
const birth = new Time('14:30 25/10/1992 +05:30', new GeoLocation('Mumbai', 72.8777, 19.0760));
for (const planet of [PlanetName.Sun, PlanetName.Moon]) {
  const result = await Calculate.PlanetRasiD1Sign(planet, birth);
  console.log(`${planet}: ${result.Name}`);
  await new Promise(resolve => setTimeout(resolve, 12_500));
}
console.log('Ascendant:', await Calculate.HouseSignName(HouseName.House1, birth));
