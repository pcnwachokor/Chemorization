import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';


export default function FormulaSolver() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const solveFormula = () => {
    setOutputText(inputText);
  };


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter equation here..."
            value={inputText}
            onChangeText={setInputText}
            multiline={true}
            scrollEnabled={true}
            textAlignVertical="top"
          />
          {/* Mic Button, will incorporate with tts later */}
          <TouchableOpacity
            style={styles.micButton}
            onPress={() => console.log('Tapped Mic')}
          >
            <FontAwesome name="microphone" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.answerContainer}
          placeholder="Answer:"
          value={outputText}
          multiline={true}
          scrollEnabled={true}
          textAlignVertical="top"
          editable={false}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={solveFormula}>
            <Text style={styles.buttonText}>Balance Equation</Text>
          </TouchableOpacity>
        </View>
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
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  micContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  micButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    marginTop: 50,
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
  answerContainer: {
    height: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    flex: 1,
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'top',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});