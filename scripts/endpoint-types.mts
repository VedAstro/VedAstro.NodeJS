import sdk, { Calculate } from 'vedastro';

// @ts-expect-error Service configuration is not a customer SDK setting.
Calculate.base_url = 'https://example.invalid';
// @ts-expect-error The default import must enforce the same API.
sdk.Calculate.base_url = 'https://example.invalid';


Calculate.SetAPIKey('FreeAPIUser');
sdk.Calculate.SetAPIKey('FreeAPIUser');
sdk.SetTimeout(null);
// @ts-expect-error No root-level service override either.
sdk.base_url = 'https://example.invalid';
