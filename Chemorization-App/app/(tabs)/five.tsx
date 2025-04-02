import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from './FirebaseConfig';

export default function TabFiveScreen() {
  const [userEmail, setUserEmail] = useState('');
  const [notesCount, setNotesCount] = useState(0); // Replace with real value later

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (!user) return router.replace('/');
      setUserEmail(user.email || '');
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.item}>
        <Text style={styles.itemLabel}>Email</Text>
        <Text style={styles.itemValue}>{userEmail}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemLabel}>Notes Saved</Text>
        <Text style={styles.itemValue}>{notesCount}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemLabel}>Member Since</Text>
        <Text style={styles.itemValue}>[Add Date]</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemLabel}>Role</Text>
        <Text style={styles.itemValue}>Student</Text>
      </View>

      <TouchableOpacity onPress={() => auth.signOut()} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

