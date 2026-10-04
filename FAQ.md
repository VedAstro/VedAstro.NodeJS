# FAQ

**Do I need ephemeris files?** No. Calculations run on VedAstro's API.

**Are calls synchronous?** No. Use `await`; API errors reject the Promise.

**Does it work offline?** No, it requires internet access.

**Can I use TypeScript?** Yes. Type declarations are included.

**How do I use a paid key?** Set `Calculate.SetAPIKey(process.env.VEDASTRO_API_KEY)`. Obtain keys at [vedastro.org/API.html](https://vedastro.org/API.html).

**What is the default ayanamsa?** Lahiri. Set another with `Calculate.SetAyanamsa(Ayanamsa.Raman)` or scope with `Calculate.use_ayanamsa(value, async () => ...)`.

**Why does import print text and access npm?** This mirrors the Python package's banner and update check. Disable the check with `VEDASTRO_DISABLE_AUTO_UPDATE=1`.

**What is the free rate limit?** Five requests per minute.
