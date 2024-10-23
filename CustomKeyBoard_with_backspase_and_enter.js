import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomKeyboard = ({ onKeyPress }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  
  return (
    <View style={styles.keyboardContainer}>
      {/* Number keys */}
      {keys.map((key) => (
        <TouchableOpacity key={key} onPress={() => onKeyPress(key)} style={styles.keyButton}>
          <Text style={styles.keyText}>{key}</Text>
        </TouchableOpacity>
      ))}

      {/* Backspace button */}
      <TouchableOpacity onPress={() => onKeyPress('backspace')} style={[styles.keyButton, styles.specialKeyButton]}>
        <Text style={styles.keyText}>⌫</Text>
      </TouchableOpacity>

      {/* Enter button */}
      <TouchableOpacity onPress={() => onKeyPress('enter')} style={[styles.keyButton, styles.specialKeyButton]}>
        <Text style={styles.keyText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  keyButton: {
    backgroundColor: 'orange', // Orange color for buttons
    padding: 20,
    margin: 5,
    borderRadius: 8,
    width: 60, // Set width for number keys
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialKeyButton: {
    width: 120, // Larger width for special keys like Backspace and Enter
  },
  keyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomKeyboard;


//perent component

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomKeyboard from './CustomKeyboard'; // Assuming you saved the CustomKeyboard component separately

const KeyboardExample = () => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (key) => {
    if (key === 'backspace') {
      // Remove the last character from the input
      setInputValue((prev) => prev.slice(0, -1));
    } else if (key === 'enter') {
      // Perform some action on Enter (e.g., submit or print)
      console.log('Enter pressed, input value:', inputValue);
    } else {
      // Append the key to the input value
      setInputValue((prev) => prev + key);
    }
  };

  return (
    <View style={styles.container_keyBoard}>
      <TextInput
        style={styles.input_keyBoard}
        value={inputValue}
        onChangeText={setInputValue} // To allow manual text input
        placeholder="Type here..."
      />
      <CustomKeyboard onKeyPress={handleKeyPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container_keyBoard: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input_keyBoard: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
});

export default KeyboardExample;
