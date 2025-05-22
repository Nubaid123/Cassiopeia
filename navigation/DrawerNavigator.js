import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/Details';
import Events from '../screens/Events';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, View } from 'react-native';

const Drawer = createDrawerNavigator();

const HeaderRight = () => (
  <View>
    <Image
      source={require('../assets/Images/icon.png')}
      style={{ width: 69, height: 63, marginRight: 30 }}
      resizeMode="contain"
    />
  </View>
);

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0e152d' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#0e152d', width: 240 },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#aaa',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
      <Drawer.Screen
        name="Resources"
        component={DetailsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="rocket-outline" size={22} color={color} />
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
      <Drawer.Screen
        name="Events"
        component={Events}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="list-outline" size={22} color={color} />
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
    </Drawer.Navigator>
  );
}
