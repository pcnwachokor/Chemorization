/*import { StyleSheet } from 'react-native';
import { Keyboard } from 'react-native'; */
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import { TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

import braille from '@/components/braille';

/*
export default function TabFourScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Four</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/four.tsx" />
    </View>
  );
}
*/

export default function BrailleTranslation() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  /*const translate = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }
  }
*/

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

let generatePDF = async() => {
  const file = await printToFileAsync({
    html: html,
    base64: false
  });

  await shareAsync(file.uri);
};

return (
  
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <TextInput
        placeholder="Enter text here..."
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        multiline={true}
        numberOfLines={(4)}
        />

    <TextInput
        placeholder="Translation:"
        value={outputText}
        multiline={true}
        numberOfLines={4}
        />

        <Button 
          title = "Translate"
        onPress={textToBraille}>
        </Button>

    <Button
      title = "Generate PDF"
      onPress={generatePDF}>
      </Button>

  </View>
  </TouchableWithoutFeedback>
);

};

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
});


