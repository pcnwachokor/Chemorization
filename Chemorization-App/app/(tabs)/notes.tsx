import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome } from '@expo/vector-icons';
import { db, storage } from '@/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const chemistryExplanations = [
  'The periodic table organizes elements based on atomic number and chemical properties.',
  'A chemical reaction occurs when reactants transform into products, following the law of conservation of mass.',
  'Acids release hydrogen ions in water, while bases release hydroxide ions.',
];

export default function TabTwoScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const speak = () => {
    Speech.speak(chemistryExplanations[currentIndex], {
      language: 'en-US',
      pitch: 1,
      rate: 1,
    });
  };

  const nextExplanation = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % chemistryExplanations.length);
  };

  const uploadNoteFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });

      if (result.canceled || !result.assets?.[0]) {
        Alert.alert('Cancelled', 'No file selected.');
        return;
      }

      const file = result.assets[0];
      const response = await fetch(file.uri);
      const blob = await response.blob();

      // Reference to Firebase Storage under the path 'chemistryNotes/'
      const storageRef = ref(storage, `chemistryNotes/${file.name}`);
      
      // Upload file to Firebase Storage
      await uploadBytes(storageRef, blob);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Add document to Firestore with file details
      await addDoc(collection(db, 'chemistryNotes'), {
        name: file.name,
        url: downloadURL,
        uploadedAt: new Date(),
      });

      Alert.alert('Success', 'File successfully uploaded!');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'File upload failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chemistry Notes</Text>

      <Text style={styles.text}>{chemistryExplanations[currentIndex]}</Text>

      <TouchableOpacity style={styles.button} onPress={speak}>
        <FontAwesome name="play-circle" size={40} color="white" />
        <Text style={styles.buttonText}>Play Explanation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={nextExplanation}>
        <FontAwesome name="arrow-right" size={40} color="white" />
        <Text style={styles.buttonText}>Next Explanation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={uploadNoteFile}>
        <FontAwesome name="upload" size={30} color="white" />
        <Text style={styles.buttonText}>Upload Chemistry Note</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D7D46',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

