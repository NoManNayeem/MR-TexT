import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import * as Speech from 'expo-speech';

const TextToSpeechScreen = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (text.trim() !== '') {
      setIsSpeaking(true);
      Speech.speak(text, {
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } else {
      Alert.alert('Empty Text', 'Please enter some text to speak.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text to Speech</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text to be spoken"
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button
        title={isSpeaking ? 'Speaking...' : 'Speak'}
        onPress={handleSpeak}
        disabled={isSpeaking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    height: 150,
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: 16,
  },
});

export default TextToSpeechScreen;
