'use strict';

const { AsyncLocalStorage } = require('node:async_hooks');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const enums = require('./src/generated/enums.cjs');

const ayanamsaContext = new AsyncLocalStorage();
let apiKey;
let defaultAyanamsa;
let baseUrl = 'https://vedastro.zaishi.net/api/Calculate';
const ayanamsaNames = new Set(Object.keys(enums.Ayanamsa || {}).map(name => name.toLowerCase()));

function enumName(value) {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return Object.keys(enums.Ayanamsa || {}).find(name => enums.Ayanamsa[name] === value);
  if (value && typeof value === 'object') {
    for (const [name, member] of Object.entries(enums.Ayanamsa || {})) {
      if (member === value || name === value.name || name === value.value) return name;
    }
  }
  return undefined;
}

function validateAyanamsa(value) {
  if (value == null) return undefined;
  const name = enumName(value) || String(value).trim();
  if (!ayanamsaNames.has(name.toLowerCase())) {
    throw new TypeError(`Unknown ayanamsa '${name}'. Pass an Ayanamsa member such as Ayanamsa.Lahiri.`);
  }
  return name;
}

function wireValue(value) {
  if (value == null || typeof value !== 'object') return value;
  if (typeof value.toJSON === 'function') return value.toJSON();
  if (typeof value.to_json === 'function') return value.to_json();
  if (Array.isArray(value)) return value.map(wireValue);
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, wireValue(child)]));
}

async function request(endpoint, args) {
  const names = require('./src/generated/manifest.cjs')[endpoint];
  const params = {};
  (names || []).forEach((name, index) => {
    if (args[index] !== undefined) params[name] = wireValue(args[index]);
  });
  if (apiKey) params.APIKey = apiKey;
  const ayanamsa = ayanamsaContext.getStore() ?? defaultAyanamsa;
  if (ayanamsa) params.Ayanamsa = ayanamsa;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);
  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/${encodeURIComponent(endpoint)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, image/svg+xml' },
      body: JSON.stringify(params),
      signal: controller.signal
    });
    const text = await response.text();
    if (!response.ok) throw new Error(`VedAstro API HTTP ${response.status}: ${text.slice(0, 500)}`);
    if (response.headers.get('content-type')?.includes('image/svg+xml') || /^\s*<svg[\s>]/i.test(text)) return text;
    let data;
    try { data = JSON.parse(text); } catch { throw new Error('VedAstro API returned invalid JSON'); }
    if (data?.Status === 'Fail') throw new Error(`VedAstro API error: ${data.Payload ?? 'Unknown error'}`);
    if (!Object.prototype.hasOwnProperty.call(data || {}, 'Payload') || data.Payload == null) {
      throw new Error('VedAstro API response is missing its Payload');
    }
    const payload = data.Payload;
    if (Array.isArray(payload) || typeof payload !== 'object') return payload;
    const keys = Object.keys(payload);
    return keys.length === 1 ? payload[keys[0]] : payload;
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error('VedAstro API request timed out after 120 seconds');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function findProjectRoot() {
  const packageRoot = path.resolve(__dirname);
  const nodeModules = path.dirname(packageRoot);
  if (path.basename(nodeModules) !== 'node_modules') return null;
  try {
    if (fs.lstatSync(packageRoot).isSymbolicLink()) return null;
  } catch { return null; }
  let current = path.dirname(nodeModules);
  while (current !== path.dirname(current)) {
    if (fs.existsSync(path.join(current, 'package.json'))) {
      return fs.existsSync(path.join(current, 'package-lock.json')) ? current : null;
    }
    current = path.dirname(current);
  }
  return null;
}

async function checkForUpdate() {
  if (process.env.VEDASTRO_DISABLE_AUTO_UPDATE === '1') return;
  const projectRoot = findProjectRoot();
  if (!projectRoot) return;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5_000);
    let response;
    try { response = await fetch('https://registry.npmjs.org/vedastro/latest', { signal: controller.signal }); }
    finally { clearTimeout(timer); }
    if (!response.ok) return;
    const latest = (await response.json()).version;
    const installed = require('./package.json').version;
    if (!latest || latest === installed) return;
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const child = spawn(npm, ['install', '--save-exact', `vedastro@${latest}`, '--prefix', projectRoot], {
      cwd: projectRoot, windowsHide: true, stdio: 'ignore', shell: process.platform === 'win32'
    });
    const killTimer = setTimeout(() => child.kill(), 120_000);
    child.once('error', () => clearTimeout(killTimer));
    child.once('exit', code => {
      clearTimeout(killTimer);
      if (code === 0) console.log(`VedAstro updated to ${latest}. Please restart your script for changes to take effect.`);
      else console.log(`VedAstro update failed. Run: npm install vedastro@latest`);
    });
  } catch { /* Network and package-manager failures must not prevent API use. */ }
}

const client = {
  request,
  SetAPIKey(value) { apiKey = value || undefined; },
  SetAyanamsa(value) { defaultAyanamsa = validateAyanamsa(value); },
  GetAyanamsa() { return ayanamsaContext.getStore() ?? defaultAyanamsa; },
  use_ayanamsa(value, callback) {
    if (typeof callback !== 'function') throw new TypeError('use_ayanamsa requires an async callback');
    return ayanamsaContext.run(validateAyanamsa(value), callback);
  },
  get base_url() { return baseUrl; },
  set base_url(value) { baseUrl = String(value); }
};

if (process.stdout) process.stdout.write('VedAstro : Easy To Use Advanced Astrology Engine\n');
setImmediate(() => { void checkForUpdate(); });

module.exports = client;
