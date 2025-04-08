import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import braille from '@/components/braille';
import { generatePDF } from '@/utils/pdfUtils';

const FileUploader = () => {
  const [fileContent, setFileContent] = useState('');
  const [outputText, setOutputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isConverted, setIsConverted] = useState(false); // Tracks if Braille conversion has occurred

  // Function to pick a file
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'text/plain', // supports text files
          //'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //docx is more complex, will research
        ],
      });

      if (result.canceled || !result.assets) return;

      const fileUri = result.assets[0].uri;

      // Read file content
      const content = await FileSystem.readAsStringAsync(fileUri);
      setFileContent(content);
      setOutputText('');
      setIsConverted(false);
      setModalVisible(true);
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const textToBraille = () => {
    if (!fileContent) return;
    setOutputText(braille.toBraille(fileContent));
    setIsConverted(true);
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a File" onPress={pickDocument} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>
              {isConverted ? 'Braille Translation' : 'Original Text'}
            </Text>
            <ScrollView style={styles.textScroll}>
              <Text style={styles.text}>
                {isConverted ? outputText : fileContent}
              </Text>
            </ScrollView>

            {/* Convert to Braille Button (Inside Modal) */}
            {!isConverted && (
              <TouchableOpacity
                style={styles.convertButton}
                onPress={textToBraille}
              >
                <Text style={styles.convertButtonText}>Convert to Braille</Text>
              </TouchableOpacity>
            )}

            {/* Generate PDF Button */}
            {isConverted && (
              <TouchableOpacity
                style={[styles.button, styles.pdfButton]}
                onPress={() => generatePDF(outputText)}
              >
                <Text style={styles.buttonText}>Generate PDF</Text>
              </TouchableOpacity>
            )}

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textScroll: {
    maxHeight: 300,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
  },
  convertButton: {
    backgroundColor: '#2D7D46',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  convertButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  pdfButton: {
    backgroundColor: '#2D7D46',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FileUploader;
