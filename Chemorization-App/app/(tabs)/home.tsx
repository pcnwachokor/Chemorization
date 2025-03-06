import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Speech from "expo-speech";

const HomeScreen = () => {
  
  // Function to speak predefined chemistry content
  const speak = () => {
    const textToSpeak = "Welcome to Chemorization. This app helps visually impaired students learn chemistry with voice assistance.";
    
    Speech.speak(textToSpeak, {
      language: "en-US",
      pitch: 1,
      rate: 1,
    });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Chemorization Home</Text>

      {/* Mic Button for TTS */}
      <View style={styles.micContainer}>
        <TouchableOpacity
          style={styles.micButton}
          onPress={speak} // Trigger TTS on tap
          //onLongPress={() => console.log("Long Press for Periodic Table")} // Can be customized
        >
          <FontAwesome name="microphone" size={48} color="white" />
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <Text style={styles.tapText}>Tap the Mic!</Text>
      <Text style={styles.orText}>OR</Text>
      <Text style={styles.longPressText}>Long press for Periodic Table Assistant</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  micContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  micButton: {
    backgroundColor: "#2D7D46",
    width: 170,
    height: 170,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
  },
  tapText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 25,
  },
  orText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#2D7D46",
  },
  longPressText: {
    fontSize: 18,
    color: "#2D7D46",
    marginTop: 5,
  },
});

