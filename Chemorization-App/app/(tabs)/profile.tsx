import React, { useEffect, useState } from 'react';
import MicOverlay from '@/components/MicOverlay';
import { StyleSheet, TouchableOpacity, View as RNView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from '@/FirebaseConfig';
import { useCustomTheme } from '@/app/_layout';

export default function TabFiveScreen() {
  const [userEmail, setUserEmail] = useState('');
  const [notesCount, setNotesCount] = useState(0); // Replace with real value later

  const { mode, primaryColor } = useCustomTheme();

  const containerBackground = mode === 'dark' ? '#333333' : '#fff';
  const headerBackground = mode === 'dark' ? '#000000' : '#f2f2f2';
  const itemBackground = mode === 'dark' ? '#555555' : '#f2f2f2';

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (!user) return router.replace('/');
      setUserEmail(user.email || '');
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: containerBackground }]}>
      <MicOverlay />
      <RNView
        style={[styles.headerContainer, { backgroundColor: headerBackground }]}
      >
        <Text
          style={[styles.header, { color: mode === 'dark' ? '#fff' : '#000' }]}
        >
          My Profile
        </Text>
      </RNView>

      <RNView style={[styles.item, { backgroundColor: itemBackground }]}>
        <Text style={styles.itemLabel}>Email</Text>
        <Text style={styles.itemValue}>{userEmail}</Text>
      </RNView>

      <RNView style={[styles.item, { backgroundColor: itemBackground }]}>
        <Text style={styles.itemLabel}>Notes Saved</Text>
        <Text style={styles.itemValue}>{notesCount}</Text>
      </RNView>

      <RNView style={[styles.item, { backgroundColor: itemBackground }]}>
        <Text style={styles.itemLabel}>Member Since</Text>

        <Text style={styles.itemValue}>[Add Date]</Text>
      </RNView>

      <RNView style={[styles.item, { backgroundColor: itemBackground }]}>
        <Text style={styles.itemLabel}>Role</Text>
        <Text style={styles.itemValue}>Student</Text>
      </RNView>

      <TouchableOpacity
        onPress={() => auth.signOut()}
        style={[styles.button, { backgroundColor: primaryColor }]}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 80,
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
