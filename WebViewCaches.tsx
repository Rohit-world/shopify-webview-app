import React from 'react';
import WebWrapper from './components/WebWrapper.tsx';
import { SHOPIFY_URLS } from './config/shopify';

export const commonWebProps = {
  sharedCookiesEnabled: true,
  thirdPartyCookiesEnabled: true,
  javaScriptEnabled: true,
  domStorageEnabled: true,
  startInLoadingState: true,
  injectedJavaScript: `
    document.addEventListener("click", function(e) {
      let el = e.target;
      while (el) {
        if (el.tagName === "BUTTON" || el.type === "submit") {
          window.ReactNativeWebView.postMessage("buttonClicked");
          break;
        }
        el = el.parentElement;
      }
    }, true);
    true;
  `,
  onMessage: (event: any) => {
    if (event.nativeEvent.data === "buttonClicked") {
      // You’ll call haptic feedback here
    }
  }
};

export const webViews = {
  Home: <WebWrapper uri={SHOPIFY_URLS.home} />,
  Shop: <WebWrapper uri={SHOPIFY_URLS.products} />,
  Cart: <WebWrapper uri={SHOPIFY_URLS.cart} />,
  Account: <WebWrapper uri={SHOPIFY_URLS.account} />,
};
