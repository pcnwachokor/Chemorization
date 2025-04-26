import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVoiceCommand } from './useVoiceCommand';
import { useCustomTheme } from '@/app/_layout';
import { speak } from '@/utils/speak';
import { router } from 'expo-router';

export default function MicOverlay() {
  const { isRecording, startRecording } = useVoiceCommand();
  const { voice } = useCustomTheme();

  return (
    <TouchableOpacity
      style={[styles.pill, isRecording && styles.pillActive]}
      activeOpacity={0.8}
      onPress={startRecording}
      onLongPress={() => {
        speak('Opening Assistant', voice);
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
    top: 10,
    alignSelf: 'center',
    width: '90%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2D7D46',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  pillActive: {
    opacity: 0.6,
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
