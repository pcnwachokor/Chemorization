/*import { StyleSheet } from 'react-native';
import { Keyboard } from 'react-native'; */
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import {
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

import braille from '@/components/braille';

export default function BrailleTranslation() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

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
        <TextInput
          placeholder="Enter text here..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          placeholder="Translation:"
          value={outputText}
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={textToBraille}>
          <Text style={styles.buttonText}>Translate</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pdfButton: {
    backgroundColor: '#28A745',
  },
});
