import React, { useState, useEffect } from 'react';
import { Text, Image, View, Dimensions, StyleSheet } from 'react-native';

export default function Gmage({ text, image }) {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenWidth(window.width);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const sWidth = Math.min(screenWidth * 0.9, 500);
  const imageHeight = sWidth * 0.6;
  const textSize = Math.min(Math.max(screenWidth * 0.03, 14), 22);

  return (
    <View style={[styles.container, { width: sWidth }]}>
      <Image
        source={image}
        style={[styles.image, { width: sWidth, height: imageHeight }]}
        resizeMode="cover"
        accessibilityRole="image"
      />
      <Text style={[styles.text, { fontSize: textSize }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343c4c',
    padding: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
});
