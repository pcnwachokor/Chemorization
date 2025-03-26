import { View, Text, StyleSheet } from 'react-native';

export default function LookupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔬 Periodic Table Lookup Screen</Text>
      {/* Add your element input, display, and accessibility features here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
