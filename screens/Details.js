import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import n from '../assets/Images/n.png';
import t from '../assets/Images/blog.png';
import back from '../assets/Images/back.png';
import CustomScrollView from '../components/CustomScroll';
import ImageSection from '../components/ImageSection';

export default function DetailsScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const sWidth = Math.min(width * 0.9, 500);

  return (
    <CustomScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>

      <ImageSection
        image={t}
        text="Blog"
        onPress={() => navigation.navigate('Blog')}
        width={sWidth}
      />

      <ImageSection
        image={n}
        text="Gallery"
        onPress={() => navigation.navigate('Gallery')}
        width={sWidth}
      />
    </CustomScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e152d',
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
});
