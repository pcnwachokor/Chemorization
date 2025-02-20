//this is landing page
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const LandingPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name="flask" size={100} color="white" style={styles.icon} />
        <Text style={styles.title}>Chemorization</Text>
        <Text style={styles.subheading}>Welcome to your journey of chemistry {"\n"} learning!</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('..//auth/signin')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signUpButton, styles.outlinedText]} onPress={() => router.push('..//auth/signin')}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006400', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'darkgreen',
    fontSize: 16,
  },
  signUpButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'darkgreen',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16
  },
  outlinedText: {
    fontWeight: "bold",
    borderWidth: .5, // Thickness of the outline
    borderColor: "white", // Outline color
    backgroundColor: "darkgreen", // Background color inside the border
  },
  icon: {
    marginBottom: 20,
  }
});

export default LandingPage;