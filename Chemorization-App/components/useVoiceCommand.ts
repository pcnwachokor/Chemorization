import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import { router } from 'expo-router';

const ASSEMBLY_API_KEY =
  Constants.expoConfig?.extra?.ASSEMBLY_API_KEY ?? '';

export function useVoiceCommand() {
  const recordingRef = useRef<import('expo-av').Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // base64 → Uint8Array
  const base64ToUint8Array = (base64: string): Uint8Array => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

  // start recording
  const startRecording = async () => {
    if (recordingRef.current) return;
    const perm = await Audio.requestPermissionsAsync();
    if (!perm.granted) {
      return Alert.alert(
        'Permission required',
        'Please allow microphone access.'
      );
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

    // auto-stop after 6s
    setTimeout(() => {
      stopRecording();
    }, 6000);
  };

  // sStop & unload, then transcribe
  const stopRecording = async () => {
    const rec = recordingRef.current;
    if (!rec) return;
    try {
      await rec.stopAndUnloadAsync();
      const uri = rec.getURI();
      recordingRef.current = null;
      setIsRecording(false);
      if (uri) await sendToAssemblyAI(uri);
    } catch (err) {
      console.error('Stop error:', err);
    }
  };

  // upload + poll AssemblyAI
  const sendToAssemblyAI = async (uri: string) => {
    try {
      const b64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const bin = base64ToUint8Array(b64);

      const uploadRes = await fetch(
        'https://api.assemblyai.com/v2/upload',
        {
          method: 'POST',
          headers: {
            authorization: ASSEMBLY_API_KEY,
            'Content-Type': 'application/octet-stream',
          },
          body: bin,
        }
      );
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
      while (!completed) {
        const poll = await (
          await fetch(
            `https://api.assemblyai.com/v2/transcript/${id}`,
            { headers: { authorization: ASSEMBLY_API_KEY } }
          )
        ).json();

        if (poll.status === 'completed') {
          completed = true;
          const txt = poll.text
            .toLowerCase()
            .replace(/[.,!?]/g, '')
            .trim();
          routeCommand(txt);
        } else if (poll.status === 'error') {
          throw new Error(poll.error);
        } else {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    } catch (err) {
      console.error('AssemblyAI Error:', err);
      Alert.alert('Transcription Failed', 'Could not transcribe audio.');
    }
  };

  // route based on transcript keywords
  const routeCommand = (text: string) => {
    if (text.includes('home')) {
      Speech.speak('Opening Home');
      router.push('/home');
    } else if (text.includes('settings')) {
      Speech.speak('Opening Settings');
      router.push('/settings');
    } else if (text.includes('notes')) {
      Speech.speak('Opening Notes');
      router.push('/notes');
    } else if (text.includes('formula')) {
      Speech.speak('Opening Formulas');
      router.push('/formulasolver');
    } else if (text.includes('braille')) {
      Speech.speak('Opening Braille Reader');
      router.push('/brailleprint');
    } else if (text.includes('profile')) {
      Speech.speak('Opening Profile');
      router.push('/profile');
    } else if (text.includes('summary')) {
      Speech.speak('Opening Summary');
      router.push('/summarizer');
    } else if (
      text.includes('assistant') ||
      text.includes('ai') ||
      text.includes('help')
    ) {
      Speech.speak('Opening Assistant');
      router.push('/assistant');
    } else {
      Speech.speak("Sorry, I didn't understand that.");
      Alert.alert('Command Not Recognized', `Heard: ${text}`);
    }
  };

  return { isRecording, startRecording };
}
