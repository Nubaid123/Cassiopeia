import React from 'react';
import { Text, Image, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import back from '../assets/Images/back.png';

const { width, height } = Dimensions.get('window');
const sWidth = Math.min(width * 0.9, 500);
const headingFont = sWidth * 0.08;
const subheadingFont = sWidth * 0.045;

export default function Blog({ navigation }) {
  return (
    <CustomScrollView contentContainerStyle={styles.container} style={styles.background}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backWrapper}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={[styles.heading, { fontSize: headingFont }]}>
        Cassiopeia Club of Astronomy Blog
      </Text>

      <Text style={[styles.subheading, { fontSize: subheadingFont }]}>
        The Blog hasn't landed yet. Must've burned up along with some meteors...
      </Text>
    </CustomScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#0e152d',
  },
  container: {
    padding: 20,
  },
  backWrapper: {
    alignSelf: 'flex-start',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subheading: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
});
