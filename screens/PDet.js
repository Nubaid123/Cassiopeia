import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Image
} from 'react-native';
import CustomScrollView from '../components/CustomScroll';

export default function PDet({ navigation }) {
  const { width, height } = useWindowDimensions();

  const sWidth = Math.min(width * 0.9, 500);
  return (
    <CustomScrollView contentContainerStyle={{ padding: 20 }}
      style={{ backgroundColor: '#0e152d' }}>
       <View style={{ padding: width * 0.05, alignItems: 'center' }}>
        <Text
          style={{
            fontSize: sWidth * 0.08,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Under The Night Sky
        </Text>
        <Text
          style={{
            fontSize: sWidth * 0.045,
            color: 'white',
            textAlign: 'center',
            marginTop: 10,
          }}>
          A Stargazing Workshop
        </Text>
        <Text
          style={{
            fontSize: sWidth * 0.05,
            color: 'white',
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Conducted by: Ajith Everester
        </Text>
        <Text
          style={{
            fontSize: sWidth * 0.05,
            color: 'white',
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Organized by: Cassiopeia Club of Astronomy
        </Text>
        <Text
          style={{
            fontSize: sWidth * 0.04,
            color: 'white',
            textAlign: 'center',
            marginTop: 15,
          }}>
          A magical night of stargazing, learning, and cosmic curiosity, conducted on Friday, 25th April, from 7:00 PM to 11 PM

        </Text>
      </View>
    </CustomScrollView>
  );
}
