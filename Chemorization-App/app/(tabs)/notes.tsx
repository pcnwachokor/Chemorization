import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
 // Alert,
} from 'react-native';
//import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome } from '@expo/vector-icons';
//import { collection, addDoc } from 'firebase/firestore';
//import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'expo-router';
//import { db, storage } from '@/FirebaseConfig'; // Ensure this path is correct

export default function NotesHomeScreen() {
  const router = useRouter();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/add')}>
        <FontAwesome name="plus-circle" size={30} color="white" />
        <Text style={styles.buttonText}>Add New Note</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/view')}>
        <FontAwesome name="folder-open" size={30} color="white" />
        <Text style={styles.buttonText}>View Notes</Text>
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
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D7D46',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});
