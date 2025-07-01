import React from 'react';
import WebWrapper from './components/WebWrapper.tsx';

export const SHOP_URL = 'https://ds-dotera.myshopify.com';

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
  Home: <WebWrapper uri={SHOP_URL} />,
  Shop: <WebWrapper uri={`${SHOP_URL}/collections/all`} />,
  Cart: <WebWrapper uri={`${SHOP_URL}/cart`} />,
  Account: <WebWrapper uri={`${SHOP_URL}/account`} />,
};