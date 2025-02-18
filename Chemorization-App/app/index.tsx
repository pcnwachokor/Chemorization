// this is the landing page
import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { router } from 'expo-router';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props: { theme: { background: any; }; }) => props.theme.background};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${(props: { theme: { text: any; }; }) => props.theme.text};
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props: { theme: { primary: any; }; }) => props.theme.primary};
  padding: 12px 20px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: bold;
`;

const Index = () => {
  return (
    <Container style={{ backgroundColor: 'darkgreen' }}>
      <Title style= {{ color: 'white' }}>Welcome to Chemorization!</Title>
      <Button onPress={() => router.push('/(auth)/signin')}>
        <ButtonText style= {{ color: 'white' }}>Sign In</ButtonText>
      </Button>
    </Container>
  );
};

export default Index;