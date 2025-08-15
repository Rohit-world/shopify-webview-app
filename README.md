# Shopify Store WebView App

A **React Native** project using **react-native-webview** to deliver your Shopify store as a high-performance mobile experience—with smooth animations, haptic feedback, data caching, and fast rendering, just like a true native app.

---

## 🚀 Quick Start

1. **Clone the Project**

    ```
    git clone <REPO_URL>
    cd <PROJECT_NAME>
    ```

2. **Set Your Shopify Store URL**

    In `app.js`, edit the base URL:

    ```
    // app.js
    const SHOPIFY_BASE_URL = 'https://your-shopify-store.myshopify.com';
    ```

3. **Install Dependencies**

    ```
    npm install
    # or
    yarn install
    ```

    For iOS:

    ```
    cd ios
    pod install
    cd ..
    ```

4. **Start Metro**

    ```
    npm start
    # or
    yarn start
    ```

5. **Run the App**

    - **Android:**
        ```
        npm run android
        # or
        yarn android
        ```
    - **iOS:**
        ```
        npm run ios
        # or
        yarn ios
        ```

---

## ✨ Features

- Full native-like experience for Shopify stores
- Smooth animations and transitions
- Haptic feedback for enhanced UX
- Data caching for performance and offline use
- Fast rendering powered by React Native & WebView

---

## 🛠 Modify Your App

Open `App.tsx` or `app.js` to make changes—Fast Refresh will update your app instantly.  
To force reload:

- Android: Press <kbd>R</kbd> twice or use the Dev Menu (<kbd>Ctrl</kbd>+<kbd>M</kbd> / <kbd>Cmd</kbd>+<kbd>M</kbd>)
- iOS: Press <kbd>R</kbd> in the Simulator

---

## ❓ Troubleshooting

Check the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting) if you hit any snags.

---

## 📝 Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- [Shopify Help Center](https://help.shopify.com)

---

## 🎉 That's it!

Your Shopify site is now a fast, feature-rich mobile app!  
**To point to a different Shopify store, just update `SHOPIFY_BASE_URL` in `app.js`.**

---

> Replace `<REPO_URL>` and `<PROJECT_NAME>` with your actual repo link and folder name.
