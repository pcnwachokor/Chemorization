import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function TabSixScreen() {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSummarize = () => {
    if (text.trim() === '' && fileName === '') {
      Alert.alert('Error', 'Please enter text or upload a document to summarize.');
      return;
    }
    // Placeholder for summarization logic
    console.log('Summarizing:', text || `File: ${fileName}`);
    Alert.alert('Summarization', 'Summarization feature is under development.');
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // You can add more types if needed
        copyToCacheDirectory: true,
      });

      // Ensure result is valid and check its type
      if (result.type === 'success') {
        setFileName(result.name || 'Unknown File');
        console.log('File selected:', result);
      } else {
        console.log('File selection canceled.');
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to upload the document.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summarizer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text to summarize"
        value={text}
        onChangeText={setText}
        multiline
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
        <Text style={styles.uploadButtonText}>
          {fileName ? `Uploaded: ${fileName}` : 'Upload PDF or Document'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSummarize}>
        <Text style={styles.buttonText}>Summarize</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});