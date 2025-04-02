import { StyleSheet, TouchableOpacity } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from './FirebaseConfig';

export default function TabFiveScreen() {
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace('/');
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={() => auth.signOut()} style={{ marginTop: 40 }}>
        <Text style={{ color: 'red' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});