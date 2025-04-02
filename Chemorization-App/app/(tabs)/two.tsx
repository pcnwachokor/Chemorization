import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';

const OPENAI_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY ?? '';

export default function AssistantScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question || !OPENAI_API_KEY) return;
    setLoading(true);
    setAnswer('');

    const prompt = `You are a knowledgeable chemistry tutor. Answer the following chemistry question concisely and accurately. Question: ${question}`;

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
    <ScrollView
      contentContainerStyle={styles.container}
      accessible={true}
      accessibilityLabel="Chemistry Assistant screen"
      accessibilityHint="This screen allows you to ask any chemistry question using text input."
    >
      <Text
        style={styles.title}
        accessibilityRole="header"
        accessibilityLabel="Chemistry Assistant"
      >
        Chemistry Assistant
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ask a chemistry question..."
        value={question}
        onChangeText={setQuestion}
        multiline
        accessibilityLabel="Question input field"
        accessibilityHint="Type any chemistry-related question here"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={askAI}
        disabled={loading}
        accessibilityLabel="Ask button"
        accessibilityRole="button"
        accessibilityHint="Sends your question to the chemistry assistant"
      >
        <Text style={styles.buttonText}>{loading ? 'Thinking...' : 'Ask'}</Text>
      </TouchableOpacity>

      {answer ? (
        <View
          style={styles.answerBox}
          accessible={true}
          accessibilityLabel="AI response"
          accessibilityHint="This is the response from the chemistry assistant"
        >
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    minHeight: 80,
  },
  button: {
    backgroundColor: '#2D7D46',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  answerBox: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 8,
  },
  answerText: {
    fontSize: 16,
  },
});

