import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Participant from './Participant';
import Det from './Det';
import back from '../assets/Images/back.png';
import { db } from '../components/config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const Tab = createMaterialTopTabNavigator();

export default function Feventsd({ navigation }) {
  const { width } = useWindowDimensions();

  const handleBackPress = async () => {
    try {
      alert('This might take a while');
      const snapshot = await getDocs(collection(db, 'tempfevent'));

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id; // Assuming only one document
        await deleteDoc(doc(db, 'tempfevent', docId));
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error deleting tempfevent:', error);
      alert('Error', 'Could not delete temp event. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={{ padding: 10 }}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={back} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      {/* Top Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#1a2238' },
          tabBarLabelStyle: { fontWeight: 'bold', color: 'white' },
          tabBarIndicatorStyle: { backgroundColor: '#3a8be8' },
        }}
      >
        <Tab.Screen name="Details" component={Det} options={{ tabBarLabel: 'Details' }} />
        <Tab.Screen name="Registration" component={Participant} options={{ tabBarLabel: 'Registration' }}/>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e152d',
  },
});
