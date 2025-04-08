import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddNoteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new Note</Text>
      {/* Your upload form or component goes here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
