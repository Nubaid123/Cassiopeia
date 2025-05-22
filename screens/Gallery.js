import { Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import * as React from 'react';
import Gmage from '../components/Gmage';
import back from '../assets/Images/back.png';
import feed from '../assets/Images/feed.png';
import cass from '../assets/Images/cass.png';
import proj from '../assets/Images/Proj.png';
import bl from '../assets/Images/news.png';

const { width } = Dimensions.get('window');
const sWidth = Math.min(width * 0.9, 500);

export default function Gallery({ navigation }) {
  return (
    <CustomScrollView
      contentContainerStyle={{ padding: 20 }}
      style={{ backgroundColor: '#0e152d' }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
        <Image source={back} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: sWidth * 0.08,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 15,
        }}
      >
        Gallery
      </Text>

      <View style={{ alignItems: 'center' }}>
        <Gmage text="Feedback board from first event" image={feed} />
        <Gmage text="Picture from past project" image={proj} />
        <Gmage text="Our First Event!" image={cass} /> {/* Added caption */}
        <Gmage text="Photo taken at stargazing workshop" image={bl} />
      </View>
    </CustomScrollView>
  );
}
