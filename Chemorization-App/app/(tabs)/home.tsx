import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed'; // Use custom Themed components for Text & View
import { Ionicons } from '@expo/vector-icons';
import RippleButton from '@/components/RippleButton';
import * as Speech from 'expo-speech';
import { router } from 'expo-router';
import { useCustomTheme } from '@/app/_layout';

const HomeScreen = () => {
  const { mode } = useCustomTheme();

  const containerBackground = mode === 'dark' ? '#333333' : '#f0f0f0';

  // Function to speak predefined chemistry content
  const speak = () => {
    const textToSpeak =
      'Welcome to Chemorization. This app helps visually impaired students learn chemistry with voice assistance.';
    Speech.speak(textToSpeak, {
      language: 'en-US',
      pitch: 1,
      rate: 1,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: containerBackground }]}>
      <View style={styles.searchContainer}
>
        <Text style={styles.searchText}>Search for Chemistry Resources</Text>

        <Ionicons
          name="volume-high"
          size={24}
          color="white"
          style={styles.speakerIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#555"
        />
      </View>
      <View style={styles.micContainer}>
        <Text style={styles.tapText}>Tap to Chemorize</Text>
        <RippleButton
          onPress={() => {
            console.log('Tapped Mic');
            speak();
          }}
          onLongPress={() => {
            console.log('Long pressed');
            router.push('/assistant');
          }}
        />
      </View>
      <Text style={styles.orText}>OR</Text>
      <Text style={styles.longPressText}>
        Long press for Periodic Table Assistant
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor will be overridden inline

  },
  searchContainer: {
    backgroundColor: '#2D7D46',
    width: '100%',
    height: 200,
    padding: 50,
    borderRadius: 15,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  searchText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
  },
  speakerIcon: {
    position: 'absolute',
    right: 20,
    top: 100,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
    padding: 10,
  },
  micContainer: {
    marginTop: 30, // was 14
    alignItems: 'center',
  },
  tapText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 18,
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2D7D46',
  },
  longPressText: {
    fontSize: 14,
    color: '#2D7D46',
    marginTop: 5,
  },
});