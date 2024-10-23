// Normal keyboard

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomKeyboard = ({ onKeyPress }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <View style={styles.keyboardContainer}>
      {keys.map((key) => (
        <TouchableOpacity key={key} onPress={() => onKeyPress(key)} style={styles.keyButton}>
          <Text style={styles.keyText}>{key}</Text>
        </TouchableOpacity>
      ))}
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
    backgroundColor: 'orange', // Orange color for the buttons
    padding: 20,
    margin: 5,
    borderRadius: 8, // Rounded corners to give a modern feel
    width: 60, // Set a fixed width for the buttons to look uniform
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    color: 'white', // White text to contrast the orange background
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomKeyboard;
