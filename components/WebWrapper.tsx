import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
  Dimensions,
  AppState,
} from 'react-native';
import { WebView } from 'react-native-webview';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export interface WebWrapperRef {
  forceRepaint: () => void;
}

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

interface Props {
  uri: string;
  onCheckoutUrlChange?: (isCheckout: boolean) => void;
}

const WebWrapper = forwardRef<WebWrapperRef, Props>(({ uri, onCheckoutUrlChange }, ref) => {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(uri);
  const [appState, setAppState] = useState(AppState.currentState);

  const screenWidth = Dimensions.get('window').width;
  const translateX = useSharedValue(0);
  const modalScale = useSharedValue(1);
  const modalOpacity = useSharedValue(1);
  const loaderOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: modalScale.value }],
    opacity: modalOpacity.value,
  }));

  const loaderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: loaderOpacity.value,
  }));

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [canGoBack]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        webViewRef.current?.reload();
      }
      setAppState(nextAppState);
    });
    return () => subscription.remove();
  }, [appState]);

  useEffect(() => {
    if (isLoading) {
      loaderOpacity.value = withTiming(1, { duration: 150 });
    } else {
      loaderOpacity.value = withTiming(0, { duration: 250 });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => setIsLoading(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  useImperativeHandle(ref, () => ({
    forceRepaint: () => {
      webViewRef.current?.injectJavaScript(`
        requestAnimationFrame(() => {
          document.body.style.visibility = 'hidden';
          document.body.offsetHeight;
          document.body.style.visibility = 'visible';
        });
        true;
      `);
    },
  }));

  const injectedJS = `
(function() {
  var meta = document.createElement('meta');
  meta.setAttribute('name', 'viewport');
  meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  document.head.appendChild(meta);

  var style = document.createElement('style');
  style.innerHTML = \`
    * {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-touch-callout: none;
    }
  \`;
  document.head.appendChild(style);

  document.addEventListener('click', function(event) {
    const el = event.target;
    if (
      el.closest('button') ||
      el.closest('input[type="submit"]') ||
      el.closest('[role="button"]') ||
      el.closest('.button')
    ) {
      window.ReactNativeWebView.postMessage("buttonClicked");
    }
  }, true);

  (function(history) {
    const pushState = history.pushState;
    const replaceState = history.replaceState;

    function sendUrlChange() {
      window.ReactNativeWebView.postMessage("urlChanged:" + location.href);
    }

    history.pushState = function() {
      pushState.apply(history, arguments);
      sendUrlChange();
    };

    history.replaceState = function() {
      replaceState.apply(history, arguments);
      sendUrlChange();
    };

    window.addEventListener('popstate', sendUrlChange);
  })(window.history);
})();
true;
`;

  const handleMessage = (event: any) => {
    const message = event.nativeEvent.data;
    console.log("📩 Received message from WebView:", message);

    if (message === 'buttonClicked') {
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    }

    if (message === 'modalOpened') {
      modalScale.value = 0.9;
      modalOpacity.value = 0;
      modalScale.value = withTiming(1, { duration: 300 });
      modalOpacity.value = withTiming(1, { duration: 300 });
    }

    if (message.startsWith('urlChanged:')) {
      const updatedUrl = message.replace('urlChanged:', '');
      setCurrentUrl(updatedUrl);

      if (onCheckoutUrlChange) {
        const isCheckoutUrl =
          updatedUrl.includes('/checkouts') ||
          updatedUrl.startsWith('https://api.razorpay.com/v1/checkout/hosted');
        onCheckoutUrlChange(isCheckoutUrl); // ✅ boolean flag to parent
      }
    }
  };

  const handleNavigationChange = (navState: any) => {
    const nextUrl = navState.url;

    const isCheckoutUrl =
      nextUrl.includes('/checkouts') ||
      nextUrl.startsWith('https://api.razorpay.com/v1/checkout/hosted');

    if (onCheckoutUrlChange) {
      onCheckoutUrlChange(isCheckoutUrl);
    }

    const isProductPush =
      !currentUrl.includes('/products/') && nextUrl.includes('/products/');
    const isBackFromProduct =
      currentUrl.includes('/products/') && !nextUrl.includes('/products/');

    if (isProductPush) {
      translateX.value = screenWidth;
      translateX.value = withTiming(0, { duration: 300 });
    } else if (isBackFromProduct) {
      translateX.value = -screenWidth;
      translateX.value = withTiming(0, { duration: 300 });
    }

    setCurrentUrl(nextUrl);
    setCanGoBack(navState.canGoBack);
  };

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <Animated.View style={[{ flex: 1 }, modalAnimatedStyle]}>
        <WebView
          ref={webViewRef}
          source={{ uri }}
          injectedJavaScript={injectedJS}
          onMessage={handleMessage}
          onNavigationStateChange={handleNavigationChange}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          thirdPartyCookiesEnabled
          sharedCookiesEnabled
          setDisplayZoomControls={false}
          renderToHardwareTextureAndroid={true}
          style={{ backgroundColor: '#fff' }}
          androidLayerType='hardware'
          pullToRefreshEnabled={true}
        />
      </Animated.View>

      <Animated.View
        style={[styles.loader, loaderAnimatedStyle]}
        pointerEvents="none"
      >
        <ActivityIndicator size="large" color="#000" />
      </Animated.View>
    </Animated.View>
  );
});

export default WebWrapper;

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
