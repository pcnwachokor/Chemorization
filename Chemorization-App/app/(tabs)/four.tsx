import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
} from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import FileUploader from "@/components/FileUploader";

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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter text here..."
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            multiline={true}
            scrollEnabled={true}
            textAlignVertical="top"
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
          style={styles.translationContainer}
          placeholder="Translation:"
          value={outputText}
          multiline={true}
          scrollEnabled={true}
          textAlignVertical="top"
          editable={false}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={textToBraille}>
            <Text style={styles.buttonText}>Quick Translate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.pdfButton]}
            onPress={generatePDF}
          >
            <Text style={styles.buttonText}>Generate PDF</Text>
          </TouchableOpacity>
        </View>
        <FileUploader />
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
  buttonContainer: {
    marginTop: "auto",
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
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#007AFF",
    borderRadius: 25,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
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
  translationContainer: {
    height: 200,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
  },
  translation: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    textAlignVertical: "top",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
