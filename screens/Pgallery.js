import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import Gmage from '../components/Gmage';
import feed from '../assets/Images/feed.png';
import cass from '../assets/Images/cass.png';
import bl from '../assets/Images/news.png';

const { width } = Dimensions.get('window');
const sWidth = Math.min(width * 0.9, 500);

export default function Pgallery() {
  return (
    <CustomScrollView
      contentContainerStyle={{ padding: 20 }}
      style={{ backgroundColor: '#0e152d' }}
    >
      <Text
        style={{
          fontSize: sWidth * 0.08,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Gallery
      </Text>

      <View style={{ alignItems: 'center' }}>
        <Gmage text="Feedback board from first event" image={feed} />
        <Gmage text="" image={cass} />
        <Gmage text="Photo taken at stargazing workshop" image={bl} />
      </View>
    </CustomScrollView>
  );
}
