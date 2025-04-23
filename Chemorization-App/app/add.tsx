// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function AddNoteScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add a new Note</Text>
//       {/* Your upload form or component goes here */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { db, storage } from '@/FirebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'expo-router';

export default function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<any>(null);
  const router = useRouter();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
      });

      if (!result.canceled && result.assets?.length > 0) {
        setFile(result.assets[0]);
        Alert.alert('File selected:', result.assets[0].name);
      } else {
        Alert.alert('No file selected');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error picking file');
    }
  };

  const handleUpload = async () => {
    if (!title || !category || !file) {
      Alert.alert('Please fill all fields and select a file');
      return;
    }
  
    try {
      const response = await fetch(file.uri);
      const blob = await response.blob();
  
      // Create a reference in Firebase Storage
      const storageRef = ref(storage, `chemistry-notes/${file.name}`);
  
      // Upload the file
      await uploadBytes(storageRef, blob);
  
      // Get the download URL after upload
      const downloadURL = await getDownloadURL(storageRef);
  
      // Save the metadata in Firestore
      await addDoc(collection(db, 'Chemistry Notes'), {
        title,
        category,
        url: downloadURL, // 🔥 This is the important part
        uploadedAt: Timestamp.now(),
        fileName: file.name,
        subject: 'chemistry',
      });
  
      Alert.alert('Success', 'Chemistry note uploaded!');
      setTitle('');
      setCategory('');
      setFile(null);
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert('Error uploading file');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Chemistry Note</Text>

      <TextInput
        style={styles.input}
        placeholder="Note Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g. Acids, Bases, Reactions)"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.pickButton} onPress={pickDocument}>
        <Text style={styles.pickText}>
          {file ? `Selected: ${file.name}` : 'Pick PDF or Image'}
        </Text>
      </TouchableOpacity>

      <Button title="Upload Chemistry Note" onPress={handleUpload} color="#2D7D46" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: Platform.OS === 'ios' ? 12 : 10,
    marginBottom: 15,
  },
  pickButton: {
    backgroundColor: '#2D7D46',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  pickText: {
    color: '#fff',
    fontSize: 16,
  },
});
