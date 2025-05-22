import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pgallery from './Pgallery';
import PDet from './PDet';
import back from '../assets/Images/back.png';

const Tab = createMaterialTopTabNavigator();

export default function Peventsd({ navigation }) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.backButtonImage} />
        </TouchableOpacity>
      </View>

      {/* Top Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: styles.tabBarIndicator,
        }}
      >
        <Tab.Screen name="Details" component={PDet} />
        <Tab.Screen name="Gallery" component={Pgallery} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e152d',
  },
  backButtonContainer: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  backButtonImage: {
    width: 30,
    height: 30,
    tintColor: 'white', // white tint for visibility on dark background
  },
  tabBar: {
    backgroundColor: '#1a2238',
  },
  tabBarLabel: {
    fontWeight: 'bold',
    color: 'white',
  },
  tabBarIndicator: {
    backgroundColor: '#3a8be8',
  },
});
