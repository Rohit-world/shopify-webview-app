const normalizeBaseUrl = (url: string) => url.trim().replace(/\/+$/, '');

const configuredBaseUrl = 'https://your-store.myshopify.com';

export const SHOPIFY_BASE_URL = normalizeBaseUrl(configuredBaseUrl);

export const SHOPIFY_URLS = {
  home: SHOPIFY_BASE_URL,
  products: `${SHOPIFY_BASE_URL}/collections/all`,
  collections: `${SHOPIFY_BASE_URL}/collections`,
  account: `${SHOPIFY_BASE_URL}/account`,
  cart: `${SHOPIFY_BASE_URL}/cart`,
};
