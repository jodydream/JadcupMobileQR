// src/screens/TestScreen.tsx

import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import styles from '../styles/TestScreen.styles';

type Props = StackScreenProps<RootStackParamList, 'TestScreen'>;

const TestScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Welcome to TestScreen</Text>
        </Card.Content>
      </Card>
      
      <TextInput
        label="Enter your name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={() => console.log('Entered Name:', name)}
        style={styles.button}
      >
        Save Name
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}  // 返回到之前的页面
        style={styles.button}
      >
        Go Back
      </Button>
    </View>
  );
};

export default TestScreen;
