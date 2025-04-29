import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, Alert } from 'react-native';
import { View, Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import RippleButton from '@/components/RippleButton';
import { Audio } from 'expo-av';
import type { Recording } from 'expo-av/build/Audio';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import { router } from 'expo-router';
import { cleanQuery } from '@/utils/cleanQuery';

const ASSEMBLY_API_KEY = Constants.expoConfig?.extra?.ASSEMBLY_API_KEY ?? '';

// 🔊 Voice Feedback Helper
const speak = (text: string) => {
  Speech.speak(text, {
    language: 'en-US',
    pitch: 0.8,
    rate: 0.95,
  });
};

// 🔄 Convert base64 to binary for upload
function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const recordingRef = useRef<Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [animateRipple, setAnimateRipple] = useState(false);
  const [transcriptDisplay, setTranscriptDisplay] = useState('');

  const startRecording = async () => {
    try {
      if (recordingRef.current) return;

      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Please allow microphone access.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      setIsRecording(true);
      setAnimateRipple(true);
      console.log('Recording started...');

      setTimeout(() => {
        if (recordingRef.current) {
          stopRecording();
        } else {
          setIsRecording(false);
          setAnimateRipple(false);
        }
      }, 6000);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = async () => {
    try {
      const currentRecording = recordingRef.current;
      if (!currentRecording) return;

      await currentRecording.stopAndUnloadAsync();
      const uri = currentRecording.getURI();
      console.log('Recording stopped. File stored at:', uri);

      recordingRef.current = null;
      setIsRecording(false);
      setAnimateRipple(false);
      setAudioUri(uri);

      await sendToAssemblyAI(uri);
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  };

  const sendToAssemblyAI = async (uri: string | null) => {
    if (!uri) return;

    try {
      const base64Audio = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const audioBinary = base64ToUint8Array(base64Audio);

      const uploadRes = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          authorization: ASSEMBLY_API_KEY,
          'Content-Type': 'application/octet-stream',
        },
        body: audioBinary,
      });

      const { upload_url } = await uploadRes.json();

      const transcriptRes = await fetch(
        'https://api.assemblyai.com/v2/transcript',
        {
          method: 'POST',
          headers: {
            authorization: ASSEMBLY_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ audio_url: upload_url }),
        }
      );

      const { id } = await transcriptRes.json();

      let completed = false;
      let transcriptText = '';

      while (!completed) {
        const pollingRes = await fetch(
          `https://api.assemblyai.com/v2/transcript/${id}`,
          {
            headers: { authorization: ASSEMBLY_API_KEY },
          }
        );

        const data = await pollingRes.json();

        if (data.status === 'completed') {
          completed = true;
          transcriptText = data.text.toLowerCase();
          transcriptText = transcriptText.replace(/[.,!?]/g, '').trim();
          console.log('Transcript:', transcriptText);
          setTranscriptDisplay(transcriptText);
        } else if (data.status === 'error') {
          throw new Error(data.error);
        } else {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }

      if (transcriptText.includes('home')) {
        speak('Opening Home');
        router.push('/home');
      } else if (transcriptText.includes('settings')) {
        speak('Opening Settings');
        router.push('/settings');
      } else if (
        transcriptText.includes('notes') ||
        transcriptText.includes('my notes') ||
        transcriptText.includes('open notes')
      ) {
        speak('Opening Notes');
        router.push('/notes');
      } else if (
        transcriptText.includes('formulas') ||
        transcriptText.includes('formula') ||
        transcriptText.includes('chemistry formulas')
      ) {
        speak('Opening Formulas');
        router.push('/formulasolver');
      } else if (
        transcriptText.includes('braille') ||
        transcriptText.includes('braille reader')
      ) {
        speak('Opening Braille Reader');
        router.push('/brailleprint');
      } else if (
        transcriptText.includes('profile') ||
        transcriptText.includes('my account') ||
        transcriptText.includes('take me to profile')
      ) {
        speak('Opening Profile');
        router.push('/profile');
      } else if (
        transcriptText.includes('summary') ||
        transcriptText.includes('summarizer') ||
        transcriptText.includes('summaries')
      ) {
        speak('Opening Summary');
        router.push('/summarizer');
      } else if (
        transcriptText.includes('assistant') ||
        transcriptText.includes('ai') ||
        transcriptText.includes('help')
      ) {
        speak('Opening Assistant');
        router.push('/assistant');
      } else {
        speak('Sorry, I didn’t understand that.');
        Alert.alert('Command Not Recognized', `Heard: ${transcriptText}`);
      }
    } catch (err) {
      console.error('AssemblyAI Error:', err);
      Alert.alert('Transcription Failed', 'Could not transcribe audio.');
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    const processedQuery = cleanQuery(query);
    router.push({
      pathname: '/searchresults',
      params: { query: processedQuery },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
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
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <View style={styles.micContainer}>
        <Text style={styles.tapText}>Tap to Chemorize</Text>
        <RippleButton
          animate={animateRipple}
          onPress={startRecording}
          onLongPress={() => {
            speak('Opening Assistant');
            router.push('/assistant');
          }}
          color={isRecording ? '#006400' : 'green'} //
        />
        <Text style={styles.transcriptBox}>
          {transcriptDisplay || 'Tap to Navigate...'}
        </Text>
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
    color: '#000',
  },
  micContainer: {
    marginTop: 30,
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
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  transcriptBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    fontSize: 16,
    color: '#2D7D46',
    maxWidth: '90%',
    textAlign: 'center',
    minHeight: 50,
  },
});
