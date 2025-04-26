import React from 'react';
import { StyleSheet, Switch, TouchableOpacity, View as RNView } from 'react-native';
import MicOverlay from '@/components/MicOverlay';
import { Text, View } from '@/components/Themed';
import { useCustomTheme } from '@/app/_layout';

export default function SettingsScreen() {
  const { mode, toggleTheme, font, setFont, primaryColor, setPrimaryColor, voice, setVoice } = useCustomTheme();

  const containerBackground = mode === 'dark' ? '#333333' : '#fff';
  const headerBackground = mode === 'dark' ? '#000000' : '#f2f2f2';
  const itemBackground = mode === 'dark' ? '#555555' : '#f2f2f2';
  const headerTextColor = mode === 'dark' ? '#fff' : '#000';

  const primaryColorName = primaryColor === '#006400' ? 'Green' : 'Blue';
  const voiceLabel = voice === 'default' ? 'Default' : 'UK English';

  return (
    <View style={[styles.container, { backgroundColor: containerBackground }]}>
      <MicOverlay />
      <RNView style={[styles.headerContainer, { backgroundColor: headerBackground }]}>
        <Text style={[styles.header, { color: headerTextColor }]}>Appearance</Text>
      </RNView>
     
      <RNView style={[styles.item, { backgroundColor: itemBackground }]}>
        <Text style={styles.itemLabel}>Dark Mode</Text>
        <Switch value={mode === 'dark'} onValueChange={toggleTheme} />
      </RNView>

      <RNView style={[styles.item, { backgroundColor: itemBackground }]}>
        <Text style={styles.itemLabel}>Font</Text>
        <Text style={styles.itemValue}>{font}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: primaryColor }]}
          onPress={() => setFont(font === 'System' ? 'SpaceMono' : 'System')}
        >
          <Text style={styles.buttonText}>Toggle Font</Text>
        </TouchableOpacity>
      </RNView>

      {/* <RNView style={[styles.item, { backgroundColor: itemBackground }]}>
        <Text style={styles.itemLabel}>Primary Color</Text>
        <Text style={styles.itemValue}>{primaryColorName}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: primaryColor }]}
          onPress={() => setPrimaryColor(primaryColor === '#006400' ? '#0000FF' : '#006400')}
        >
          <Text style={styles.buttonText}>Toggle Color</Text>
        </TouchableOpacity>
      </RNView> */}

      <RNView style={[styles.item, { backgroundColor: itemBackground }]}>
        <Text style={styles.itemLabel}>Voice</Text>
        <Text style={styles.itemValue}>{voiceLabel}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: primaryColor }]}
          onPress={() => setVoice(voice === 'default' ? 'uk' : 'default')}
        >
          <Text style={styles.buttonText}>Toggle Voice</Text>
        </TouchableOpacity>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  headerContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: -90,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    width: '90%',
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
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
