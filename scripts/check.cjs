'use strict';
const assert = require('node:assert/strict');
process.env.VEDASTRO_DISABLE_AUTO_UPDATE = '1';
const sdk = require('../index.cjs');
const { Calculate, Time, GeoLocation, Ayanamsa } = sdk;
const birth = new Time('14:30 25/10/1992 +05:30', new GeoLocation('Mumbai', 72.8777, 19.076));
assert.deepEqual(birth.toJSON(), { StdTime: '14:30 25/10/1992 +05:30', Location: { Name: 'Mumbai', Longitude: 72.8777, Latitude: 19.076 } });
assert.equal(Ayanamsa.Lahiri, 1);
Calculate.SetAyanamsa(Ayanamsa.Lahiri);
assert.equal(Calculate.GetAyanamsa(), 'Lahiri');
Calculate.SetAyanamsa(null);
assert.equal(Calculate.GetAyanamsa(), undefined);
assert.throws(() => Calculate.SetAyanamsa('unknown'), /Unknown ayanamsa/);
assert.equal(typeof Calculate.PlanetRasiD1Sign, 'function');
async function checkTransport() {
  Calculate.SetAPIKey('test-key');
  assert.equal('base_url' in Calculate, false);
  assert.equal('base_url' in require('../client.cjs'), false);
  Calculate.base_url = 'https://example.invalid';
  require('../client.cjs').base_url = 'https://example.invalid';
  const bodies = [];
  global.fetch = async (_url, options) => {
    assert.ok(_url.startsWith('https://vedastro.zaishi.net/api/Calculate/'));
    bodies.push(JSON.parse(options.body));
    return Response.json({ Status: 'Success', Payload: { Result: 0 } });
  };
  const [lahiri, raman] = await Promise.all([
    Calculate.use_ayanamsa(Ayanamsa.Lahiri, () => Calculate.PlanetRasiD1Sign(sdk.PlanetName.Sun, birth)),
    Calculate.use_ayanamsa(Ayanamsa.Raman, () => Calculate.PlanetRasiD1Sign(sdk.PlanetName.Moon, birth))
  ]);
  assert.equal(lahiri, 0);
  assert.equal(raman, 0);
  assert.deepEqual(bodies.map(body => body.Ayanamsa), ['Lahiri', 'Raman']);
  assert.equal(bodies[0].APIKey, 'test-key');
  assert.deepEqual(bodies[0].time, birth.toJSON());
  delete Calculate.base_url;
  delete require('../client.cjs').base_url;
  console.log('SDK smoke checks passed.');
}
checkTransport().catch(error => { console.error(error); process.exitCode = 1; });
