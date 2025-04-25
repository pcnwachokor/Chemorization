// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   View,
//   Alert,
// } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';
// import { summarizeText } from '@/components/Summarize'; // Import the summarize function

// export default function TabSevenScreen() {
//   const [text, setText] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [summary, setSummary] = useState(''); // State to store the summary

//   const handleSummarize = async () => {
//     if (text.trim() === '' && fileName === '') {
//       Alert.alert(
//         'Error',
//         'Please enter text or upload a document to summarize.'
//       );
//       return;
//     }

//     try {
//       const result = await summarizeText(text); // Call the summarizeText function
//       setSummary(result); // Update the summary state
//     } catch (error) {
//       console.error('Error summarizing text:', error);
//       Alert.alert('Error', 'Failed to summarize the text.');
//     }
//   };

//   const handleFileUpload = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: 'application/pdf', // You can add more types if needed
//         copyToCacheDirectory: true,
//       });

//       if ('uri' in result) {
//         if (result.type === 'success') {
//           setFileName(result.name || 'Unknown File');
//         }
//         console.log('File selected:', result);
//       } else {
//         console.log('File selection canceled.');
//       }
//     } catch (error) {
//       console.error('Error picking document:', error);
//       Alert.alert('Error', 'Failed to upload the document.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Summarizer</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter text to summarize"
//         value={text}
//         onChangeText={setText}
//         multiline
//       />
//       <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
//         <Text style={styles.uploadButtonText}>
//           {fileName ? `Uploaded: ${fileName}` : 'Upload PDF or Document'}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleSummarize}>
//         <Text style={styles.buttonText}>Summarize</Text>
//       </TouchableOpacity>
//       {summary ? (
//         <View style={styles.summaryContainer}>
//           <Text style={styles.summaryTitle}>Summary:</Text>
//           <Text style={styles.summaryText}>{summary}</Text>
//         </View>
//       ) : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 150,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     textAlignVertical: 'top',
//   },
//   uploadButton: {
//     backgroundColor: '#6c757d',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   button: {
//     backgroundColor: 'green',
//     padding: 10,
//     borderRadius: 5,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   summaryContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//     width: '100%',
//   },
//   summaryTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   summaryText: {
//     fontSize: 14,
//     color: '#333',
//   },
// });




import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from 'react-native';
import MicOverlay from '@/components/MicOverlay';
import { summarizeText } from '@/components/Summarize'; // Import the summarize function

export default function TabSevenScreen() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState(''); // State to store the summary

  const handleSummarize = async () => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Please enter text to summarize.');
      return;
    }

    try {
      const result = await summarizeText(text); // Call the summarizeText function
      setSummary(result); // Update the summary state
    } catch (error) {
      console.error('Error summarizing text:', error);
      Alert.alert('Error', 'Failed to summarize the text.');
    }
  };

  return (
    <View style={styles.container}>
      <MicOverlay />
      {/* <Text style={styles.title}>Summarizer</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Enter text to summarize"
        value={text}
        onChangeText={setText}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSummarize}>
        <Text style={styles.buttonText}>Summarize</Text>
      </TouchableOpacity>
      {summary ? (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary:</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '100%',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#333',
  },
});

