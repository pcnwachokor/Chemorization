import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";

const chemistryExplanations = [
  "The periodic table organizes elements based on atomic number and chemical properties.",
  "A chemical reaction occurs when reactants transform into products, following the law of conservation of mass.",
  "Acids release hydrogen ions in water, while bases release hydroxide ions.",
];

export default function TabTwoScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const speak = () => {
    Speech.speak(chemistryExplanations[currentIndex], {
      language: "en-US",
      pitch: 1,
      rate: 1,
    });
  };

  const nextExplanation = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % chemistryExplanations.length);
  };

  const getChemistryAnswer = async (question: string) => {
    setLoading(true);
    setAnswer('');
    try {
      const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENAI_API_KEY;
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful chemistry tutor. Only answer chemistry-related questions.',
            },
            {
              role: 'user',
              content: question,
            },
          ],
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      setAnswer(content || 'No response received.');
    } catch (error) {
      setAnswer('Failed to get an answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chemistry Notes</Text>

      {/* Chemistry Explanation Text */}
      <Text style={styles.text}>{chemistryExplanations[currentIndex]}</Text>

      {/* Play Button */}
      <TouchableOpacity style={styles.button} onPress={speak}>
        <FontAwesome name="play-circle" size={40} color="white" />
        <Text style={styles.buttonText}>Play Explanation</Text>
      </TouchableOpacity>

      {/* Next Explanation Button */}
      <TouchableOpacity style={styles.button} onPress={nextExplanation}>
        <FontAwesome name="arrow-right" size={40} color="white" />
        <Text style={styles.buttonText}>Next Explanation</Text>
      </TouchableOpacity>

      {/* AI Q&A Section */}
      <Text style={styles.subtitle}>Ask Chemistry Questions</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your question..."
        value={question}
        onChangeText={setQuestion}
      />
      <TouchableOpacity style={styles.button} onPress={() => getChemistryAnswer(question)}>
        <Text style={styles.buttonText}>Get Answer</Text>
      </TouchableOpacity>
      {loading ? <ActivityIndicator style={{ marginTop: 20 }} /> : <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D7D46",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  answer: {
    marginTop: 20,
    fontSize: 60,
    textAlign: 'center',
  },
});
