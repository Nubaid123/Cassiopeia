import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import ImageSection from '../components/ImageSection';

import artemis from '../assets/Images/artemis.png';
import past from '../assets/Images/past.png';
import back from '../assets/Images/back.png';

export default function Events({ navigation }) {
  const { width } = useWindowDimensions();
  const sWidth = Math.min(width * 0.9, 500);

  return (
    <CustomScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>

      <ImageSection
        image={artemis}
        text="Future Events"
        onPress={() => navigation.navigate('Fevent')}
        width={sWidth}
      />
      <ImageSection
        image={past}
        text="Past Events"
        onPress={() => navigation.navigate('Pevent')}
        width={sWidth}
      />
    </CustomScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e152d',
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
