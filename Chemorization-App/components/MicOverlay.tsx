import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVoiceCommand } from './useVoiceCommand';
import * as Speech from 'expo-speech';
import { router } from 'expo-router';

export default function MicOverlay() {
  const { isRecording, startRecording } = useVoiceCommand();

  return (
    <TouchableOpacity
      style={[
        styles.pill,
        isRecording && { opacity: 0.6 },        // visual feedback when recording
      ]}
      activeOpacity={0.8}
      onPress={startRecording}
      onLongPress={() => {
        Speech.speak('Opening Assistant');
        router.push('/assistant');
      }}
    >
      <Ionicons
        name="mic"
        size={24}
        color="white"
        style={styles.icon}
      />
      <Text style={styles.text}>Press Here</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    position: 'absolute',
    top: 10,                // adjust vertical offset as needed
    left: '5%',
    width: '90%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2D7D46',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
