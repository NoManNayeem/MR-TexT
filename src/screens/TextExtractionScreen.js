import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert, TouchableOpacity, TextInput, Clipboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const TextExtractionScreen = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const pickImage = async (source) => {
    let result;
    if (source === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        allowsMultipleSelection: false,
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        allowsMultipleSelection: false,
      });
    }

    if (!result.cancelled) {
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const performOCR = (file) => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "GM4hesvdvNCaW6lk2wSQh2rMNwxfEE89"); // Replace with your actual API key
    myHeaders.append("Content-Type", "multipart/form-data");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: file,
    };

    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setExtractedText(result["all_text"]);
        setIsCopied(false); // Reset the copy button state
      })
      .catch((error) => {
        console.error("Error", error);
        Alert.alert("OCR Error", "Failed to extract text from image.");
      });
  };

  const copyToClipboard = () => {
    Clipboard.setString(extractedText);
    setIsCopied(true); // Set the copy button state to indicate it's copied
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => pickImage('gallery')}>
        <Text style={styles.buttonText}>Pick an Image from Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => pickImage('camera')}>
        <Text style={styles.buttonText}>Capture Image using Camera</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.textHeader}>Extracted Text:</Text>
      <TextInput
        style={styles.textArea}
        value={extractedText}
        multiline
        editable={false}
      />
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isCopied ? '#28a745' : '#007BFF' }]}
        onPress={copyToClipboard}>
        <Text style={styles.buttonText}>{isCopied ? 'Copied!' : 'Copy Text'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  textArea: {
    width: '100%',
    minHeight: 100,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default TextExtractionScreen;
