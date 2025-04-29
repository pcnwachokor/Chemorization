import 'dotenv/config';

export default {
  expo: {
    name: 'Chemorization-App',
    slug: 'chemorization-app',
    owner: 'pcnwachokor',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.pcnwachokor.chemorizationapp',
    },
    android: {
      package: 'com.pcnwachokor.chemorizationapp',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: true,
    },
    scheme: 'chemorizationapp',
    newArchEnabled: true,
    extra: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      ASSEMBLY_API_KEY: process.env.ASSEMBLY_API_KEY,
    },
  },
};
