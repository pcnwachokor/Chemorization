import * as Speech from 'expo-speech';
import { useCustomTheme } from '@/app/_layout';

export const speak = (text: string, voice: "default" | "uk" = "default") => {
  let options: Speech.SpeechOptions = {
    language: voice === "uk" ? "en-GB" : "en-US",
    pitch: 0.8,
    rate: 0.95,
  };
  Speech.speak(text, options);
};
