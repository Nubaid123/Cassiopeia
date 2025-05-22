import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import milkywayImage from '../assets/Images/stars.png';
import members from '../assets/Images/carina.png';
import proj from '../assets/Images/Proj.png';
import ImageSection from '../components/ImageSection';
import BannerCarousel from '../components/Carousel';
import awards from '../assets/Images/awards.png';

export default function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();

  const sWidth = Math.min(width * 0.9, 500);

  const bannersData = [
    { image: milkywayImage, text: 'Welcome to Our Club!' },
    { image: members, text: 'Join Our Upcoming Events!' },
    { image: proj, text: 'Explore Our Resources!' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
        <View style={[styles.header, { padding: width * 0.05 }]}>
          <Text style={[styles.title, { fontSize: sWidth * 0.08 }]}>
            Cassiopeia Club of Astronomy
          </Text>

          <BannerCarousel banners={bannersData} duration={4000} />

          <Text style={[styles.subtitle, { fontSize: sWidth * 0.045 }]}>
            Science, Technology & Engineering
          </Text>

          <Text style={[styles.italicText, { fontSize: sWidth * 0.05 }]}>
            𝐅𝐨𝐫 𝐬𝐭𝐮𝐝𝐞𝐧𝐭𝐬 𝐛𝐲 𝐬𝐭𝐮𝐝𝐞𝐧𝐭𝐬
          </Text>

          <Text style={[styles.description, { fontSize: sWidth * 0.04 }]}>
            𝖯𝗅𝖺𝖼𝖾 𝗈𝖿 𝖽𝗂𝗌𝖼𝗎𝗌𝗌𝗂𝗈𝗇 𝖿𝗈𝗋 𝖺𝗌𝗍𝗋𝗈𝗇𝗈𝗆𝗒 𝖾𝗍𝗁𝗎𝗌𝗂𝖺𝗌𝗍 𝗌𝗍𝗎𝖽𝖾𝗇𝗍𝗌 𝗂𝗇 𝖰𝖺𝗍𝖺𝗋
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('About us')}>
            <Text style={[styles.linkText, { fontSize: sWidth * 0.045 }]}>About us</Text>
          </TouchableOpacity>
        </View>

        <ImageSection
          image={milkywayImage}
          text="Events"
          onPress={() => navigation.navigate('Events')}
          width={sWidth}
        />
        <ImageSection
          image={awards}
          text="Achievements"
          onPress={() => navigation.navigate('Achievements')}
          width={sWidth}
        />
        <ImageSection
          image={members}
          text="Member Registration"
          onPress={() => navigation.navigate('Members')}
          width={sWidth}
        />
        <ImageSection
          image={proj}
          text="Resources"
          onPress={() => navigation.navigate('Resources')}
          width={sWidth}
        />

        <View style={[styles.footer, { marginTop: height / 10 }]}>
          <Text style={[styles.footerText, { fontSize: sWidth * 0.045 }]}>
            Photos from 'webbtelescope.org', 'images.nasa.gov', and from past Cassiopeia events
          </Text>
          <Text style={[styles.footerText, { fontSize: sWidth * 0.045 }]}>
            Photos from external sources are all under free use for non-commercial purposes
          </Text>
          <Text style={[styles.footerText, { fontSize: sWidth * 0.045 }]}>
            Contact us at: astro.sfz123@gmail.com
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('DevLog')}>
            <Text style={[styles.linkText, { fontSize: sWidth * 0.045 }]}>DevLog for nerds</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Minigame')}>
            <Text style={[styles.linkText, { fontSize: sWidth * 0.045 }]}>Want a surprise?</Text>
          </TouchableOpacity>
        </View>
      </CustomScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0e152d',
  },
  container: {
    backgroundColor: '#0e152d',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  italicText: {
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#343c4c',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
});
