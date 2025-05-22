import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Image,
  StyleSheet,
} from 'react-native';
import F from '../assets/Images/feed.png';
import C from '../assets/Images/cass.png';
import back from '../assets/Images/back.png';

export default function Night({ navigation }) {
  const { width, height } = useWindowDimensions();
  const sWidth = Math.min(width * 0.9, 500);

  const dynamicStyles = StyleSheet.create({
    titleText: {
      fontSize: sWidth * 0.07,
      color: 'white',
      marginTop: height * 0.02,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitleText: {
      fontSize: sWidth * 0.05,
      color: 'white',
      marginTop: height * 0.05,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    imageContainer: {
      marginTop: height * 0.05,
      marginBottom: height * 0.03, // Added bottom margin for spacing
      paddingHorizontal: width * 0.02,
      alignItems: 'center',
    },
    image: {
      width: sWidth,
      height: sWidth * 0.7,
      borderRadius: 10,
    },
    caption: {
      color: 'white',
      marginTop: 8,
      fontSize: 16,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: 20 }}>
      <View style={{ alignItems: 'flex-start' }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          accessible={true}
        >
          <Image source={back} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      <Text style={dynamicStyles.titleText}>Under The Night Sky</Text>
      <Text style={dynamicStyles.subtitleText}>Gallery</Text>

      <View style={dynamicStyles.imageContainer}>
        <Image
          source={F}
          style={dynamicStyles.image}
          accessibilityLabel="Feed Image"
          accessible={true}
          onError={() => console.log('Failed to load Feed image')}
        />
        <Text style={dynamicStyles.caption}>Feed Image Caption</Text>
      </View>

      <View style={dynamicStyles.imageContainer}>
        <Image
          source={C}
          style={dynamicStyles.image}
          accessibilityLabel="Cass Image"
          accessible={true}
          onError={() => console.log('Failed to load Cass image')}
        />
        <Text style={dynamicStyles.caption}>Cass Image Caption</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0e152d',
  },
});
