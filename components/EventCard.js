import React from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';
import ImageSection from './ImageSection';

export default function EventCard({ image, onPress, date, text }) {
  const { width } = useWindowDimensions();
  const sWidth = Math.min(width * 0.8, 500);

  const fontSize = Math.min(Math.max(sWidth * 0.095, 14), 30);

  return (
    <View style={[styles.cardContainer, { width: sWidth }]}>
      <Text style={[styles.text, { fontSize }]}>
        {date}
      </Text>
      <ImageSection image={image} onPress={onPress} text={text} width={sWidth} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#343c4c',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
