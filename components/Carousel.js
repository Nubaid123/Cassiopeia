import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';

const BannerCarousel = ({
  banners,
  duration = 3000,
  horizontalMargin = 10,
  onBannerPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const bannerWidth = width - (horizontalMargin * 2);
  const bannerHeight = Math.min(width * 0.5, 400);
  const textScaleFactor = Math.min(bannerWidth / 500, 1); // Adjust 500 for base width

  useEffect(() => {
    if (banners && banners.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, duration);
      return () => clearInterval(intervalId);
    }
  }, [banners?.length, duration]);

  if (!banners || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  return (
    <View style={[styles.container, { marginHorizontal: horizontalMargin }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onBannerPress && onBannerPress(currentBanner, currentIndex)}
      >
        <Image
          source={currentBanner.image}
          style={[styles.image, { width: bannerWidth, height: bannerHeight }]}
          resizeMode="cover"
          accessible
          accessibilityLabel={currentBanner.text || 'Banner image'}
        />
        {currentBanner.text && (
          <Text
            style={[styles.text, { fontSize: 20 * textScaleFactor }]}
            accessible
            accessibilityRole="text"
          >
            {currentBanner.text}
          </Text>
        )}
      </TouchableOpacity>
      <View style={styles.indicatorContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    borderRadius: 10,
  },
  text: {
    position: 'absolute',
    bottom: 20, // slightly above bottom edge
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: 'white',
  },
});

export default BannerCarousel;
