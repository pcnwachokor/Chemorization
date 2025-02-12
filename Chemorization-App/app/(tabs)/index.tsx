import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { auth } from '@/FirebaseConfig';
import EditScreenInfo from '@/components/EditScreenInfo';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';

export default function TabOneScreen() {

  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace('/');
  });

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
