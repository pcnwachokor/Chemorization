import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
//import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try{
            const user = await signInWithEmailAndPassword(auth, email, password)
            if (user) router.replace('/(tabs)'); //routes user to tabs screen
        } catch (error: any){
            console.log(error)
            alert('Sign in failed: ' + error.message);
        }
    }
  
    const signUp = async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password)
            if (user) router.replace('/(tabs)');
        } catch (error: any){
            console.log(error)
            alert('Sign in failed: ' + error.message);
        }
    }
    

    return (
        <SafeAreaView>
            <Text>Login</Text>
            <TextInput placeholder-="email" value={email} onChangeText={setEmail}/>
            <TextInput placeholder-="password" value={password} onChangeText={setPassword} secureTextEntry/>
            <TouchableOpacity onPress={signIn}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signUp}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default index