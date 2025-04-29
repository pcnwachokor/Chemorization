import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { auth } from '../../FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace('/(tabs)/home');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Sign In Failed');
    }
  };

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        createdAt: new Date(),
      });

      router.replace('/(tabs)/home');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Sign Up Failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <Text style={styles.subheading}>
        Access your personal chemistry learning experience
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Student" value="Student" />
        <Picker.Item label="Teacher" value="Teacher" />
        <Picker.Item label="Chemist" value="Chemist" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signUpButton, styles.outlinedText]}
        onPress={signUp}
      >
        <Text style={[styles.buttonText, { color: 'black' }]}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.text}>Forgot Password?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    color: '#000000',
  },
  picker: {
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '80%',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'green',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    color: 'green',
    marginTop: 10,
    textAlign: 'right',
  },
  outlinedText: {
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 0.2,
    borderColor: 'black',
    backgroundColor: 'white',
  },
});

export default SignInScreen;
