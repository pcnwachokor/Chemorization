// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function ViewNotesScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your Notes</Text>
//       {/* Your logic to fetch and display notes goes here */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
//import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/FirebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function ViewNotesScreen() {
  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();

  const fetchNotes = async () => {
    try {
      //const notesRef = collection(db, 'Chemistry Notes');
      //const q = query(notesRef, orderBy('uploadedAt', 'desc'));
      //const snapshot = await getDocs(q);
      const snapshot = await getDocs(collection(db, 'Chemistry Notes'));


      const fetchedNotes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDelete = async (noteId: string) => {
    try {
      await deleteDoc(doc(db, 'Chemistry Notes', noteId));
      Alert.alert('Deleted', 'Note deleted successfully.');
      fetchNotes(); // Refresh list
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleOpenLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open this link.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchNotes();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle}>{item.title || 'Untitled Note'}</Text>
      <View style={styles.actions}>
        {item.url && (
          <TouchableOpacity onPress={() => handleOpenLink(item.url)}>
            <FontAwesome name="external-link" size={20} color="#007AFF" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <FontAwesome name="trash" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chemistry Notes</Text>
      {notes.length === 0 ? (
        <Text style={styles.emptyText}>No chemistry notes found.</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  noteCard: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
});





// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
// import { db } from '@/FirebaseConfig';

// export default function ViewNotesScreen() {
//   const [notes, setNotes] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchNotes = async () => {
//     try {
//       const q = query(
//         collection(db, 'notes'),
//         where('subject', '==', 'chemistry'),
//         orderBy('uploadedAt', 'desc')
//       );

//       const snapshot = await getDocs(q);
//       const fetchedNotes = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setNotes(fetchedNotes);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#2D7D46" />
//         <Text>Loading notes...</Text>
//       </View>
//     );
//   }

//   if (notes.length === 0) {
//     return (
//       <View style={styles.centered}>
//         <Text>No chemistry notes found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Chemistry Notes</Text>
//       <FlatList
//         data={notes}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.noteCard}>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.category}>{item.category}</Text>
//             <Text style={styles.content}>{item.content}</Text>
//             <Text style={styles.date}>
//               {new Date(item.uploadedAt?.seconds * 1000).toLocaleDateString()}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#2D7D46',
//   },
//   noteCard: {
//     backgroundColor: '#f0f0f0',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   category: {
//     fontStyle: 'italic',
//     marginBottom: 5,
//   },
//   content: {
//     marginVertical: 5,
//   },
//   date: {
//     fontSize: 12,
//     color: 'gray',
//     textAlign: 'right',
//   },
// });





// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
// import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
// import { db } from '@/FirebaseConfig';
// import { useIsFocused } from '@react-navigation/native';
// import { FontAwesome } from '@expo/vector-icons';

// export default function ViewNotesScreen() {
//   const [notes, setNotes] = useState([]);
//   const isFocused = useIsFocused();

//   const fetchNotes = async () => {
//     try {
//       const notesRef = collection(db, 'Chemistry Notes'); // ✅ Correct collection name
//       const q = query(notesRef, orderBy('uploadedAt', 'desc'));
//       const snapshot = await getDocs(q);

//       const fetchedNotes = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setNotes(fetchedNotes);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   };

//   const handleDelete = async (noteId: string) => {
//     try {
//       await deleteDoc(doc(db, 'Chemistry Notes', noteId));
//       Alert.alert('Deleted', 'Note deleted successfully.');
//       fetchNotes(); // Refresh list
//     } catch (error) {
//       console.error('Error deleting note:', error);
//     }
//   };

//   useEffect(() => {
//     if (isFocused) {
//       fetchNotes();
//     }
//   }, [isFocused]);

//   const renderItem = ({ item }) => (
//     <View style={styles.noteCard}>
//       <Text style={styles.noteTitle}>{item.name || 'Untitled Note'}</Text>
//       <View style={styles.actions}>
//         {item.url && (
//           <TouchableOpacity onPress={() => Alert.alert('Link', item.url)}>
//             <FontAwesome name="external-link" size={20} color="#007AFF" />
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity onPress={() => handleDelete(item.id)}>
//           <FontAwesome name="trash" size={20} color="#FF3B30" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Chemistry Notes</Text>
//       {notes.length === 0 ? (
//         <Text style={styles.emptyText}>No chemistry notes found.</Text>
//       ) : (
//         <FlatList
//           data={notes}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#888',
//     textAlign: 'center',
//     marginTop: 50,
//   },
//   noteCard: {
//     backgroundColor: '#F2F2F2',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   noteTitle: {
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   actions: {
//     flexDirection: 'row',
//     gap: 15,
//   },
// });

