import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import EventCard from '../components/EventCard';
import e from '../assets/Images/e.png';
import back from '../assets/Images/back.png';

export default function Pevents({ navigation }) {
  const { width } = useWindowDimensions();
  const sWidth = Math.min(width * 0.9, 500);

  return (
    <CustomScrollView
      contentContainerStyle={{ padding: 20 }}
      style={{ backgroundColor: '#0e152d' }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 10, alignSelf: 'flex-start' }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Image source={back} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <EventCard
          image={e}
          onPress={() => {
  console.log("Pressed!");
  navigation.navigate('PeventD');
}}

          text="Under The Night Sky"
          date="25/4/2025"
          style={{ width: sWidth }}
        />
      </View>
    </CustomScrollView>
  );
}
