'use strict';

const client = require('./client.cjs');
const { Calculate } = require('./src/generated/calculate.cjs');
const enums = require('./src/generated/enums.cjs');
Object.assign(Calculate, {
  SetAPIKey: client.SetAPIKey,
  SetAyanamsa: client.SetAyanamsa,
  GetAyanamsa: client.GetAyanamsa,
  use_ayanamsa: client.use_ayanamsa,
  SetTimeout: client.SetTimeout,
  GetTimeout: client.GetTimeout
});
Object.defineProperty(Calculate, 'base_url', {
  get: () => client.base_url,
  set: value => { client.base_url = value; }
});

class GeoLocation {
  constructor(location_name, longitude, latitude) {
    this.location_name = location_name;
    this.longitude = longitude;
    this.latitude = latitude;
  }
  toJSON() { return { Name: this.location_name, Longitude: this.longitude, Latitude: this.latitude }; }
  to_json() { return this.toJSON(); }
  toString() { return `${this.location_name} (${this.longitude}, ${this.latitude})`; }
}

class Time {
  constructor(timeStringOrParts, geolocation) {
    if (typeof timeStringOrParts === 'string') {
      this.time_string = timeStringOrParts;
      this.geolocation = geolocation;
    } else if (timeStringOrParts && typeof timeStringOrParts === 'object') {
      const p = timeStringOrParts;
      const pad = n => String(n).padStart(2, '0');
      this.time_string = `${pad(p.hour)}:${pad(p.minute)} ${pad(p.day)}/${pad(p.month)}/${p.year} ${p.offset}`;
      this.geolocation = p.geolocation;
    } else throw new TypeError('Provide a time string and geolocation, or an object with date/time fields');
    if (!this.geolocation) throw new TypeError('A geolocation is required');
  }
  toJSON() { return { StdTime: this.time_string, Location: this.geolocation.toJSON() }; }
  to_json() { return this.toJSON(); }
  url_time_string() {
    const [time, date, offset] = this.time_string.split(/\s+/);
    return `${time}/${date.replaceAll('/', '/')}/${offset}`;
  }
  toString() { return `${this.time_string} at ${this.geolocation}`; }
}

const Tools = Object.freeze({
  Print(data) { console.log(typeof data === 'object' ? JSON.stringify(data, null, 2) : data); },
  AnyToJSON(_name, data) { return JSON.stringify(data, null, 2); }
});

module.exports = { ...client, Calculate, GeoLocation, Time, Tools, ...enums };
