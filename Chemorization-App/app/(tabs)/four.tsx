/*import { StyleSheet } from 'react-native';
import { Keyboard } from 'react-native'; */
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

import braille from "@/components/braille";

export default function BrailleTranslation() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const textToBraille = () => {
    const tempText = inputText;
    //setInputText(outputText);
    setOutputText(braille.toBraille(tempText));
  };

  const html = `
<html>
    <body>
   <p> ${outputText} </p>
  </body>
</html>
`;

  let generatePDF = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter text here..."
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            multiline={true}
            numberOfLines={4}
          />
          {/* Mic Button, will incorporate with tts later */}
          <TouchableOpacity
            style={styles.micButton}
            onPress={() => console.log("Tapped Mic")}
          >
            <FontAwesome name="microphone" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.translation}
          placeholder="Translation:"
          value={outputText}
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={textToBraille}>
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={textToBraille}
        >
          <Text style={styles.buttonText}>File Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.pdfButton]}
          onPress={generatePDF}
        >
          <Text style={styles.buttonText}>Generate PDF</Text>
        </TouchableOpacity>
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
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  pdfButton: {
    backgroundColor: "#28A745",
  },
  micContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  micButton: {
    backgroundColor: "#007AFF",
    borderRadius: 25, // Circular button
    padding: 10,
    marginLeft: 8, // Space between input and mic
  },
  inputRow: {
    flexDirection: "row", // Aligns TextInput and Mic Button horizontally
    alignItems: "center", // Centers them vertically
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1, // Allows TextInput to take up most of the space
    fontSize: 16,
    padding: 10,
  },
  translation: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
  },
});
