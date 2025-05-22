// App.js
import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function DetailsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>This is the Details screen.</Text>
    </View>
  );
}

function RegistrationScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>This is the Registration screen.</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#1a2238' },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 14,
            textTransform: 'none',
          },
          tabBarIndicatorStyle: { backgroundColor: '#3a8be8' },
        }}
      >
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="Registration" component={RegistrationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0e152d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
