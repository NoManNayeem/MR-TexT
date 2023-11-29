import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import TextExtractionScreen from './src/screens/TextExtractionScreen';
import TextToSpeechScreen from './src/screens/TextToSpeechScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Text Extraction" component={TextExtractionScreen} />
        <Stack.Screen name="Text to Speech" component={TextToSpeechScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
