import React, { useRef, useState, useEffect } from 'react';
import {
  StatusBar,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import NetInfo from '@react-native-community/netinfo';

import WebWrapper, { WebWrapperRef } from './components/WebWrapper';
import AnimatedTabIcon from './components/AnimatedTabIcon';
import SplashScreen from './components/SplashScreen';
import NoInternetScreen from './components/NoInternetScreen';
import { SHOPIFY_URLS } from './config/shopify';


const Tab = createBottomTabNavigator();
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App() {
  const homeRef = useRef<WebWrapperRef>(null);
  const productsRef = useRef<WebWrapperRef>(null);
  const collectionsRef = useRef<WebWrapperRef>(null);
  const accountRef = useRef<WebWrapperRef>(null);

  const [isSplashDone, setIsSplashDone] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
     setIsConnected(Boolean(state.isConnected && state.isInternetReachable));
    });
    return () => unsubscribe();
  }, []);

  if (!isConnected) return <NoInternetScreen />;

  if (!isSplashDone) {
    const preloadUris = [
      SHOPIFY_URLS.home,
      SHOPIFY_URLS.products,
      SHOPIFY_URLS.collections,
      SHOPIFY_URLS.account,
    ];

    return (
      <View style={styles.fullScreen}>
        <SplashScreen onFinish={() => setIsSplashDone(true)} />
        {preloadUris.map((uri, index) => (
          <View key={index} style={{ width: 0, height: 0, opacity: 0 }}>
            <WebWrapper uri={uri} onCheckoutUrlChange={setIsCheckoutPage} />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" backgroundColor="black" />
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Tab.Navigator
           
            screenListeners={{
              tabPress: e => {
                ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
                const targetKey = e.target?.split('-')[0];
                switch (targetKey) {
                  case 'Home':
                    homeRef.current?.forceRepaint();
                    break;
                  case 'Products':
                    productsRef.current?.forceRepaint();
                    break;
                  case 'Collections':
                    collectionsRef.current?.forceRepaint();
                    break;
                  case 'Account':
                    accountRef.current?.forceRepaint();
                    break;
                }
              },
            }}
            screenOptions={({ route }) => ({
              lazy:false,
              headerShown: false,
              tabBarStyle: isCheckoutPage
                ? { display: 'none' }
                : { paddingVertical: 5, height: 60 },
              tabBarActiveTintColor: '#000',
              tabBarInactiveTintColor: 'gray',
              tabBarIcon: ({ color, size, focused }) => {
                const icons: Record<string, string> = {
                  Home: 'home',
                  Products: 'pricetags',
                  Collections: 'albums',
                  Account: 'person',
                };

                return (
                  <AnimatedTabIcon
                    name={icons[route.name]}
                    color={color}
                    size={size}
                    isFocused={focused}
                  />
                );
              },
            })}
          >
            <Tab.Screen name="Home">
              {() => (
                <WebWrapper
                  uri={SHOPIFY_URLS.home}
                  ref={homeRef}
                  onCheckoutUrlChange={setIsCheckoutPage}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Products">
              {() => (
                <WebWrapper
                  uri={SHOPIFY_URLS.products}
                  ref={productsRef}
                  onCheckoutUrlChange={setIsCheckoutPage}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Collections">
              {() => (
                <WebWrapper
                  uri={SHOPIFY_URLS.collections}
                  ref={collectionsRef}
                  onCheckoutUrlChange={setIsCheckoutPage}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Account">
              {() => (
                <WebWrapper
                  uri={SHOPIFY_URLS.account}
                  ref={accountRef}
                  onCheckoutUrlChange={setIsCheckoutPage}
                />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  safeArea: { flex: 1, backgroundColor: '#fff' },
});

