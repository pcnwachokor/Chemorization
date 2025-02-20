import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from '@/FirebaseConfig';

export default function TabFiveScreen() {
  
    getAuth().onAuthStateChanged((user) => {
        if (!user) router.replace('/');
      });
    // If user is not signed in, redirect to login screen
      
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Sign Out</Text>
          <TouchableOpacity onPress={() => auth.signOut()}>
            <Text>Sign Out</Text>    
            {/* Signout button */}
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
