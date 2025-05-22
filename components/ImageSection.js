import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ImageSection({ image, text, onPress, width }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.touchable, { width, height: width * 0.6 }]}
        accessibilityRole="button"
        accessibilityLabel={text}
        activeOpacity={0.8}
      >
        <Image
          source={image}
          style={[styles.image, { width, height: width * 0.6 }]}
          resizeMode="cover"
        />

        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <Text style={[styles.text, { fontSize: width * 0.08 }]}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
  },
  touchable: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden', // Important for borderRadius on Android Image + gradient
  },
  image: {
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
