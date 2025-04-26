export default {
  expo: {
    name: 'Chemorization-App',
    slug: 'Chemorization-App',
    owner: 'pcnwachokor',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymous.Chemorization-App',
    },
    android: {
      package: 'com.pcnwachokor.chemorizationapp',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      intentFilters: [], // (safe empty)
      permissions: [], // (safe empty)
      config: {
        googleServicesFile: './google-services.json',
      },
      // 👇 **Add THIS:**
      androidManifest: [
        {
          application: {
            'tools:replace': 'android:appComponentFactory',
            'android:appComponentFactory':
              'androidx.core.app.CoreComponentFactory',
          },
        },
      ],
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
    updates: {
      url: 'https://u.expo.dev/802e82bd-d09e-499e-8093-cb221901cdbd',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    extra: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      ASSEMBLY_API_KEY: process.env.ASSEMBLY_API_KEY,
      eas: {
        projectId: '802e82bd-d09e-499e-8093-cb221901cdbd',
      },
    },
  },
};
