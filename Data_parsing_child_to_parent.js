// data parsing state from child to parent

import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

// GrandChild component
const GrandChild = ({ onRunningChange }) => {
  const [isRunning, setIsRunning] = useState(false);

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  // Effect to notify the parent whenever isRunning changes
  useEffect(() => {
    onRunningChange(isRunning); // Notify parent about the current state
  }, [isRunning]); // Dependency on isRunning

  return (
    <View>
      <Text>GrandChild is {isRunning ? 'Running' : 'Not Running'}</Text>
      <Button title="Toggle Running" onPress={toggleRunning} />
    </View>
  );
};

// Child component
const Child = ({ onRunningChange }) => {
  return (
    <View>
      <Text>Child Component</Text>
      <GrandChild onRunningChange={onRunningChange} />
    </View>
  );
};

// Parent component (App)
const App = () => {
  const [runningState, setRunningState] = useState(false);

  const handleRunningChange = (isRunning) => {
    setRunningState(isRunning); // Update parent state based on child
  };

  return (
    <View>
      <Text>Parent Component</Text>
      <Text>Running State in Parent: {runningState ? 'Running' : 'Not Running'}</Text>
      <Child onRunningChange={handleRunningChange} />
    </View>
  );
};

export default App;
