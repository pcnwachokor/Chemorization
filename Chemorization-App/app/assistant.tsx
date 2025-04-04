import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';
import { View, Text } from '@/components/Themed';
import { useCustomTheme } from '@/app/_layout';

const OPENAI_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY ?? '';

export default function AssistantScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const { mode, font, primaryColor } = useCustomTheme();

  const containerBackground = mode === 'dark' ? '#333333' : '#f0f0f0';
  const inputBackground = mode === 'dark' ? '#555555' : '#f9f9f9';
  const answerBoxBackground = mode === 'dark' ? '#555555' : '#e0f7fa';

  const askAI = async () => {
    if (!question || !OPENAI_API_KEY) return;
    setLoading(true);
    setAnswer('');

    const prompt = `You are a chemistry tutor AI. Only answer questions about the periodic table. Be concise and accurate. Question: ${question}`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
      });

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
      contentContainerStyle={[styles.container, { backgroundColor: containerBackground }]}
      accessible={true}
      accessibilityLabel="Periodic Table Assistant screen"
      accessibilityHint="This screen allows you to ask chemistry questions using text input."
    >
      <Text
        style={[styles.title, { fontFamily: font === 'SpaceMono' ? 'SpaceMono' : undefined }]}
        accessibilityRole="header"
        accessibilityLabel="Periodic Table Assistant"
      >
        Periodic Table Assistant
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: inputBackground }]}
        placeholder="Ask a question about the periodic table..."
        placeholderTextColor="#555"
        value={question}
        onChangeText={setQuestion}
        multiline
        accessibilityLabel="Question input field"
        accessibilityHint="Type a question about the periodic table here"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: primaryColor }]}
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
          style={[styles.answerBox, { backgroundColor: answerBoxBackground }]}
          accessible={true}
          accessibilityLabel="AI response"
          accessibilityHint="This is the response from the chemistry assistant"
        >
          <Text style={[styles.answerText, { fontFamily: font === 'SpaceMono' ? 'SpaceMono' : undefined }]}>{answer}</Text>
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
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000', // Always black text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 80,
  },
  button: {
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
    padding: 15,
    borderRadius: 8,
  },
  answerText: {
    fontSize: 16,
  },
});