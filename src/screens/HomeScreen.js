import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/rsz_mr_text.png')}
        style={styles.logo}
      />
      <Text style={styles.appName}>MR Text</Text>
      <Text style={styles.title}>Welcome to the App</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Text Extraction')}>
        <Text style={styles.buttonText}>Extract Text</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Text to Speech')}>
        <Text style={styles.buttonText}>Text to Speech</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 400, // Set the width of your logo image
    height: 400, // Set the height of your logo image
    marginBottom: 20, // Adjust spacing between logo and app name
  },
  appName: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: 'bold', // Add bold styling to the app name
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
