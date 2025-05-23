import React, { useEffect, useState } from 'react';
import MicOverlay from '@/components/MicOverlay';
import { StyleSheet, TouchableOpacity, View as RNView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
import { auth, db } from '@/FirebaseConfig';
import { useCustomTheme } from '@/app/_layout';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function TabFiveScreen() {
  const [userEmail, setUserEmail] = useState('');
  const [notesCount, setNotesCount] = useState(0);
  const [memberSince, setMemberSince] = useState('');
  const [userRole, setUserRole] = useState('Student');

  const { mode, primaryColor } = useCustomTheme();

  const containerBackground = mode === 'dark' ? '#333333' : '#fff';
  const headerBackground = mode === 'dark' ? '#000000' : '#f2f2f2';
  const itemBackground = mode === 'dark' ? '#555555' : '#f2f2f2';

  const fetchNoteCount = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'notes'));
      setNotesCount(snapshot.size);
    } catch (error) {
      console.error('Error fetching notes count:', error);
    }
  };

  const fetchUserRole = async (uid: string) => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', uid));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0].data();
        setUserRole(doc.role || 'Student');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (!user) return router.replace('/');
      setUserEmail(user.email || '');

      if (user.metadata?.creationTime) {
        const createdDate = new Date(user.metadata.creationTime);
        setMemberSince(createdDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }));
      }

      fetchNoteCount();
      fetchUserRole(user.uid);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: containerBackground }]}>
      <MicOverlay />
      <RNView style={[styles.headerContainer, { backgroundColor: headerBackground }]}>
        <Text style={[styles.header, { color: mode === 'dark' ? '#fff' : '#000' }]}>
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
        <Text style={styles.itemValue}>{memberSince || '[Unavailable]'}</Text>
      </RNView>

      <RNView style={[styles.item, { backgroundColor: itemBackground }]}>
        <Text style={styles.itemLabel}>Role</Text>
        <Text style={styles.itemValue}>{userRole}</Text>
      </RNView>

      <TouchableOpacity onPress={() => auth.signOut()} style={[styles.button, { backgroundColor: primaryColor }]}>
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
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  headerContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: -30,
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
