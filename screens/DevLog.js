import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import back from '../assets/Images/back.png';

export default function Det({ navigation }) {
  const { width } = useWindowDimensions();
  const sWidth = Math.min(width * 0.9, 500);

  return (
    <CustomScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={[styles.title, { fontSize: sWidth * 0.08 }]}>DevLog</Text>

      <Text style={[styles.italicText, { fontSize: sWidth * 0.05 }]}>
        Last Updated: May 16, 2025
      </Text>

      <Text style={[styles.italicText, { fontSize: sWidth * 0.05 }]}>
        New Website: Should have more updates in the future!
      </Text>

      <Text style={[styles.italicText, { fontSize: sWidth * 0.05 }]}>
        Added HomeScreen, EventScreen plus children, About Us, DevLog, Registrations, Gallery, Blog
      </Text>
    </CustomScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e152d',
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  italicText: {
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});
