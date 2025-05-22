import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image
} from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import back from '../assets/Images/back.png';

export default function Det({ navigation }) {
  const { width } = useWindowDimensions();
  const sWidth = Math.min(width * 0.9, 500);

  return (
    <CustomScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={[styles.title, { fontSize: sWidth * 0.1 }]}>
        About Us
      </Text>
    </CustomScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e152d',
  },
  contentContainer: {
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
