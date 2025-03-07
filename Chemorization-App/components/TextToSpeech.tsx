import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";

const TextToSpeech = () => {
  const [text, setText] = useState("");

  const speak = () => {
    if (text.trim() === "") {
      alert("Please enter text to read aloud");
      return;
    }
    Speech.speak(text, {
      language: "en-US",
      pitch: 1,
      rate: 1,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text-to-Speech</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text to speak..."
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.micButton} onPress={speak}>
        <FontAwesome name="microphone" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default TextToSpeech;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  micButton: {
    backgroundColor: "#2D7D46",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
