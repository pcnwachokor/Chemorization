import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function SummarizerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Summarizer Page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});