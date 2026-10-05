# FAQ

Short answers to the questions that come up most. The [README](README.md) has runnable examples for each of these.

**Which Node.js versions are supported?** Node.js 22 or newer, for the built-in `fetch` and `AsyncLocalStorage`.

**Do I need ephemeris files or a compiler?** No. The package has zero runtime dependencies and no native modules — all calculations run on VedAstro's API.

**Are calls synchronous?** No. Every calculation returns a `Promise`, so `await` it (or use `.then()`). Failures reject with an `Error`.

**Does it work offline?** No. An internet connection is required for every calculation.

**CommonJS or ES modules?** Both work, but the package is **ES module first** — it sets `"type": "module"`, and the demos here use `import` with top-level `await`. For CommonJS, `require('vedastro')` still works: just move your `await`s inside an `async` function, because `require()` and top-level `await` cannot coexist in one file.

**Can I use TypeScript?** Yes. Generated declarations for all 684 methods ship with the package, so you get autocompletion and type checking with no extra `@types` package.

**How do I use a paid key?** Read it from the environment at startup:

```js
Calculate.SetAPIKey(process.env.VEDASTRO_API_KEY);
```

Never ship the key in browser code — call the API from your server. Get keys at [vedastro.org/API.html](https://vedastro.org/API.html).

**What is the default ayanamsa?** With nothing set, the API applies its own default, which measures as Lahiri. Change it globally with `Calculate.SetAyanamsa(Ayanamsa.Raman)`, or scope it to a block with `await Calculate.use_ayanamsa(value, async () => ...)`. The scoped form is safe across concurrent async work and reverts when the callback returns.

**Why does importing the package print text and access npm?** It prints a one-line banner and checks npm for a newer version in the background. The check only runs when the package sits inside a project with a `package-lock.json`; if a newer version exists it installs it into that project and you must restart to load it. Disable it with `VEDASTRO_DISABLE_AUTO_UPDATE=1` — worth doing in serverless environments.

**What are the rate limits?** The free tier allows 5 requests per minute. Paid keys are quoted as 200 calls per minute in the API's own rate-limit error. Confirm current limits and pricing at [vedastro.org/API.html](https://vedastro.org/API.html).

**A call failed — what should I check?** In order: the API key, the time string format (`"HH:MM DD/MM/YYYY +TZ:TZ"`, 24-hour, DD/MM/YYYY), the coordinate order (`GeoLocation(name, longitude, latitude)`), and the rate limit. Rejections carry the API's own message, so log `error.message`.

**Can I use this commercially?** Yes. MIT licensed, and both the free and paid tiers permit commercial use.
