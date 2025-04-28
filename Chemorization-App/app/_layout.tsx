import React, { createContext, useContext, useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { Pressable, Text } from 'react-native';
import { router } from 'expo-router';

export { ErrorBoundary } from 'expo-router';
export const unstable_settings = { initialRouteName: '(tabs)' };

SplashScreen.preventAutoHideAsync();

interface CustomThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  font: string;
  setFont: (font: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  voice: "default" | "uk";            // add
  setVoice: (voice: "default" | "uk") => void;   // add
}

const CustomThemeContext = createContext<CustomThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
  font: 'System',
  setFont: () => {},
  primaryColor: '#006400',
  setPrimaryColor: () => {},
  voice: "default",         // add
  setVoice: () => {},       // add
});

export const useCustomTheme = () => useContext(CustomThemeContext);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });


  const [mode, setMode] = useState<"light" | "dark">("light");
  const [font, setFont] = useState("System");
  const [primaryColor, setPrimaryColor] = useState("#006400");
  const [voice, setVoice] = useState<"default" | "uk">("default");    // move here!


  const toggleTheme = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (

    <CustomThemeContext.Provider value={{
      mode,
      toggleTheme,
      font,
      setFont,
      primaryColor,
      setPrimaryColor,
      voice,
      setVoice,         // <-- you forgot to pass it!
    }}>
      <RootLayoutNav />
    </CustomThemeContext.Provider>
  );
}

function RootLayoutNav() {
  const { mode, primaryColor } = useCustomTheme();
  const baseTheme = mode === 'dark' ? DarkTheme : DefaultTheme;
  const customBackground =
    mode === 'dark' ? '#333333' : baseTheme.colors.background;

  const customTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: primaryColor,
      background: customBackground,
      text: '#000000',
    },
  };

  return (
    <ThemeProvider value={customTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/signin"
          options={{
            headerTransparent: true,
            title: '',
            headerLeft: () => false,
            headerRight: () => (
              <Pressable onPress={() => router.back()}>
                <Text
                  style={{ color: '#000000', fontSize: 16, marginRight: 15 }}
                >
                  Cancel
                </Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen
          name="assistant"
          options={{
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Text
                  style={{ color: '#000000', fontSize: 20, marginRight: 15 }}
                >
                  Back
                </Text>
              </Pressable>
            ),
            headerRight: () => false,
          }}
        />
        <Stack.Screen name="add" options={{ title: 'Upload Note' }} />
        <Stack.Screen name="view" options={{ title: 'View Notes' }} />
        <Stack.Screen
          name="searchresults"
          options={{
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Text
                  style={{ color: '#000000', fontSize: 20, marginRight: 15 }}
                >
                  Back
                </Text>
              </Pressable>
            ),
            headerRight: () => false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
