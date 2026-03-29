# Shopify WebView App (React Native)

Turn a Shopify storefront into a mobile app using React Native and WebView, with tabbed navigation, haptic feedback, splash preloading, and offline handling.

This project is designed to be open source and contribution-friendly.

## Features

- Shopify storefront loaded in `react-native-webview`
- Bottom tabs for `Home`, `Products`, `Collections`, and `Account`
- Splash screen with preloading for faster first navigation
- Haptic feedback on tab press and web button clicks
- Checkout detection that hides tab bar on checkout/payment pages
- No-internet fallback screen
- Pull-to-refresh and Android hardware acceleration

## Tech Stack

- React Native `0.80`
- React `19`
- TypeScript
- React Navigation (bottom tabs)
- `react-native-webview`
- `react-native-reanimated`
- `react-native-haptic-feedback`
- `@react-native-community/netinfo`

## Project Structure

```text
.
|- App.tsx
|- components/
|  |- WebWrapper.tsx
|  |- SplashScreen.tsx
|  |- NoInternetScreen.tsx
|  `- AnimatedTabIcon.tsx
|- assets/
|- android/
|- ios/
`- __tests__/
```

## Getting Started

### Prerequisites

- Node.js `>= 18`
- React Native Android/iOS environment set up
- Xcode (for iOS development)
- Android Studio + SDK (for Android development)

React Native environment guide:
https://reactnative.dev/docs/set-up-your-environment

### 1. Clone

```bash
git clone <YOUR_REPO_URL>
cd shopify-webview-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your Shopify store URL

In [`App.tsx`](./App.tsx), set the `SHOPIFY_BASE_URL` value:

```ts
const SHOPIFY_BASE_URL = 'https://your-store.myshopify.com';
```

Notes:
- Use your actual store domain.
- Do not add a trailing slash.

### 4. iOS only: install pods

```bash
cd ios
pod install
cd ..
```

### 5. Start Metro

```bash
npm run start
```

### 6. Run the app

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

## Available Scripts

- `npm run start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests

## Customization

- Tab routes are defined in [`App.tsx`](./App.tsx).
- WebView behavior and injected JavaScript are in [`components/WebWrapper.tsx`](./components/WebWrapper.tsx).
- Splash animation source is [`assets/dsstore.json`](./assets/dsstore.json).

## Contributing

Contributions are welcome and appreciated.

1. Fork the repo.
2. Create a feature branch:
   ```bash
   git checkout -b feat/short-description
   ```
3. Make your changes with clear commit messages.
4. Run checks before pushing:
   ```bash
   npm run lint
   npm run test
   ```
5. Open a Pull Request with:
   - what changed
   - why it changed
   - screenshots or recordings for UI changes
   - testing notes

### Contribution Guidelines

- Keep PRs focused and small when possible.
- Match the existing code style and file structure.
- Add or update tests for behavior changes.
- Discuss significant architecture changes in an issue before implementation.

## Troubleshooting

- React Native troubleshooting:
  https://reactnative.dev/docs/troubleshooting
- If iOS build fails after dependency changes, run:
  ```bash
  cd ios && pod install && cd ..
  ```

## License

Add a license file before publishing publicly (MIT is a common choice for open source projects).
