import type { JsonValue } from './types.js';
export { JsonPrimitive, JsonValue } from './types.js';

export declare class GeoLocation {
  constructor(location_name: string, longitude: number, latitude: number);
  location_name: string; longitude: number; latitude: number;
  toJSON(): { Name: string; Longitude: number; Latitude: number };
  to_json(): { Name: string; Longitude: number; Latitude: number };
  toString(): string;
}
export declare class Time {
  constructor(time: string, geolocation: GeoLocation);
  constructor(parts: { hour: number; minute: number; day: number; month: number; year: number; offset: string; geolocation: GeoLocation });
  time_string: string; geolocation: GeoLocation;
  toJSON(): { StdTime: string; Location: ReturnType<GeoLocation['toJSON']> };
  to_json(): ReturnType<Time['toJSON']>;
  url_time_string(): string;
  toString(): string;
}
export declare const Calculate: typeof import('./src/generated/calculate.js').Calculate & {
  SetAPIKey(apiKey: string | null): void;
  SetAyanamsa(ayanamsa: string | number | null): void;
  GetAyanamsa(): string | undefined;
  use_ayanamsa<T>(ayanamsa: string | number | null, callback: () => T): T;
  /**
   * Sets a deadline for each API call, in milliseconds. No deadline is applied by default: a
   * calculation can take milliseconds or minutes, so a built-in limit would only ever truncate a
   * valid answer. Pass null to remove it again.
   */
  SetTimeout(milliseconds: number | null): void;
  /** The deadline in force, or null when calls may run as long as they need. */
  GetTimeout(): number | null;
};
export declare const Tools: {
  Print(data: JsonValue): void;
  AnyToJSON(name: string, data: JsonValue): string;
};
export declare function SetAPIKey(apiKey: string | null): void;
export declare function SetAyanamsa(ayanamsa: string | number | null): void;
export declare function GetAyanamsa(): string | undefined;
export declare function use_ayanamsa<T>(ayanamsa: string | number | null, callback: () => T): T;
export { PlanetName, HouseName, ZodiacName, ChartType, DayOfWeek, ConstellationName, Avasta,
  Ayanamsa, Karana, LunarDayGroup, LunarMonth } from './src/generated/enums.js';
declare const _default: typeof import('./src/generated/enums.js') & {
  Calculate: typeof Calculate;
  GeoLocation: typeof GeoLocation;
  Time: typeof Time;
  Tools: typeof Tools;
  SetAPIKey: typeof SetAPIKey;
  SetAyanamsa: typeof SetAyanamsa;
  GetAyanamsa: typeof GetAyanamsa;
  use_ayanamsa: typeof use_ayanamsa;
  SetTimeout: typeof Calculate.SetTimeout;
  GetTimeout: typeof Calculate.GetTimeout;
};
export default _default;
