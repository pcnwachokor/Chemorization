import React from 'react';
import { StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useCustomTheme } from '@/app/_layout';

export default function SettingsScreen() {
  const { mode, toggleTheme, font, setFont, primaryColor, setPrimaryColor } = useCustomTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
     
      <View style={styles.item}>
        <Text style={styles.itemLabel}>Dark Mode</Text>
        <Switch value={mode === 'dark'} onValueChange={toggleTheme} />
      </View>

      <View style={styles.item}>
        <Text style={styles.itemLabel}>Font</Text>
        <Text style={styles.itemValue}>{font}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFont(font === 'System' ? 'SpaceMono' : 'System')}
        >
          <Text style={styles.buttonText}>Toggle Font</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemLabel}>Primary Color</Text>
        <Text style={styles.itemValue}>{primaryColor}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setPrimaryColor(primaryColor === 'Dark Green' ? 'Blue' : 'Dark Green')
          }
        >
          <Text style={styles.buttonText}>Toggle Color</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  item: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemValue: {
    fontSize: 16,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#006400',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});