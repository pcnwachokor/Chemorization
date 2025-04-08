import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';

const OPENAI_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY ?? '';

export default function FormulaSolver() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question || !OPENAI_API_KEY) return;
    setLoading(true);
    setAnswer('');

    const prompt = `You are a chemistry tutor AI. Only answer questions about balancing chemical equations. Be concise and accurate and show steps. Question: Balance this equation ${question}`;

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
          }),
        }
      );

      const data = await response.json();
      const result = data.choices?.[0]?.message?.content?.trim();
      if (result) {
        setAnswer(result);
        Speech.speak(result, { rate: 0.9 });
      } else {
        setAnswer('Sorry, no response received.');
      }
    } catch (error) {
      console.error('Error contacting OpenAI:', error);
      setAnswer('An error occurred. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter equation here..."
            value={question}
            onChangeText={setQuestion}
            multiline={true}
            scrollEnabled={true}
            textAlignVertical="top"
          />
          {/* Mic Button, will incorporate with tts later */}
          <TouchableOpacity
            style={styles.micButton}
            onPress={() => console.log('Tapped Mic')}
          >
            <FontAwesome name="microphone" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.answerContainer}
          placeholder="Answer:"
          value={answer}
          multiline={true}
          scrollEnabled={true}
          textAlignVertical="top"
          editable={false}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={askAI}>
            <Text style={styles.buttonText}>Balance Equation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#2D7D46',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  micContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  micButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    marginTop: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    paddingRight: 40,
    maxHeight: 200,
    minHeight: 50,
    flexShrink: 1,
  },
  answerContainer: {
    height: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    flex: 1,
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'top',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
