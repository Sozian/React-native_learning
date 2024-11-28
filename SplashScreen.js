import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  Image, 
  Animated 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  // Animation values
  const imagePosition = useRef(new Animated.Value(-200)).current; // Start above the screen
  const textOpacity = useRef(new Animated.Value(0)).current; // Text starts invisible

  useEffect(() => {
    // Animation sequence for image and text
    Animated.sequence([
      Animated.timing(imagePosition, {
        toValue: 0, // Move to its final position
        duration: 1500, // Duration of the animation
        useNativeDriver: true, // Use native driver for better performance
      }),
      Animated.timing(textOpacity, {
        toValue: 1, // Fade in
        duration: 1000, // Duration of the fade-in
        useNativeDriver: true,
      }),
    ]).start();

    const initializeApp = async () => {
      try {
        // Simulate a loading process (e.g., fetching data, checking storage)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check if the user has seen the intro slides
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (!isFirstLaunch) {
          await AsyncStorage.setItem('isFirstLaunch', 'true');
          router.replace('/intro-slides');
        } else {
          // Check if the user is already logged in
          const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
          if (isLoggedIn === 'true') {
            router.replace('/home'); // Navigate to Home if logged in
          } else {
            router.replace('/login'); // Navigate to Login if not logged in
          }
        }
      } catch (error) {
        console.error('Error during app initialization:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp</Text>

      {/* Animated image */}
      <Animated.Image
        source={require('../images/logo.png')}
        style={[
          styles.image,
          { transform: [{ translateY: imagePosition }] },
        ]}
      />

      {/* Animated text */}
      <Animated.Text style={[styles.subtitle, { opacity: textOpacity }]}>
        AbacusTrainer.com
      </Animated.Text>

      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
});
