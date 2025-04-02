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
    console.log('Question:', question); //
    console.log('API Key:', OPENAI_API_KEY); // for dbebugging
    if (!question || !OPENAI_API_KEY) return;
    setLoading(true);
    setAnswer('');

    const prompt = `You are a chemistry tutor AI. Only answer questions about the periodic table. Be concise and accurate. Question: ${question}`;

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
            max_tokens: 100,
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Periodic Table Assistant</Text>
      <TextInput
        style={styles.input}
        placeholder="Ask a question about the periodic table..."
        value={question}
        onChangeText={setQuestion}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={askAI}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Thinking...' : 'Ask'}</Text>
      </TouchableOpacity>

      {answer ? (
        <View style={styles.answerBox}>
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
