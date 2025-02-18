// auth/signin.tsx
import React, { useState } from 'react';
import { SafeAreaView, TextInput, Alert } from 'react-native';
import styled from 'styled-components/native';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  background-color: white;
  color: black;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) => props.theme.primary};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace('/(tabs)/home');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Sign In Failed', error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace('/(tabs)/home');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <Container>
      <Title>Sign In</Title>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={signIn}>
        <ButtonText>Login</ButtonText>
      </Button>
      <Button onPress={signUp} style={{ backgroundColor: '#444' }}>
        <ButtonText>Sign Up</ButtonText>
      </Button>
    </Container>
  );
};

export default SignInScreen;