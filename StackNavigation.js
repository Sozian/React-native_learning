import { View, Text } from 'react-native'
import React from 'react'
import Home1 from './Home1'
import Home2 from './Home2'

import { NavigationContainer } from '@react-navigation/native';  // Importing NavigationContainer
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();  // Creating the stack navigator

const App = () => {
  return (
    
      <NavigationContainer initialRouteName="home2">
       
          <Stack.Navigator>

                <Stack.Screen name="Home1" component={Home1}/>
                <Stack.Screen name="Home2" component={Home2}/>

          </Stack.Navigator>   
      </NavigationContainer>
    
  )
}

export default App
