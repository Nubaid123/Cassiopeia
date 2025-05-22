import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import back from '../assets/Images/back.png';

export default function Achievements({ navigation }) {
  const { width, height } = useWindowDimensions();
  const sWidth = Math.min(width * 0.9, 500);
  const headingFont = sWidth * 0.08;
  const subheadingFont = sWidth * 0.045;
  const bodyFont = sWidth * 0.04;

  return (
    <CustomScrollView contentContainerStyle={styles.container} style={styles.background}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backWrapper}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.heading, { fontSize: headingFont }]}>Our Achievements</Text>

        {achievements.map((item, index) => (
          <View key={index} style={styles.achievementBlock}>
            <Text style={[styles.subheading, { fontSize: subheadingFont }]}>{item.title}</Text>
            {item.description.map((para, i) => (
              <Text key={i} style={[styles.bodyText, { fontSize: bodyFont }]}>
                {para}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </CustomScrollView>
  );
}

const achievements = [
  {
    title: 'Top 10 in the World - Catch a Star Competition (2024)',
    description: [
      'Recognized by the European Southern Observatory (ESO) and the European Association for Astronomy Education (EAAE) for outstanding research on exoplanets. Ranked among the top 10 global entries for scientific quality and innovation.',
    ],
  },
  {
    title: "Founded Qatar's First-Ever Student-led Astronomy Club",
    description: [
      "The Cassiopeia Club became Qatar's first official astronomy student club, founded, run, and led by passionate students to promote astronomy through research, exhibitions, and creativity.",
    ],
  },
  {
    title: 'Official Inauguration in Collaboration with Everester Observatory (2025)',
    description: [
      'The club was inaugurated in a special event held in partnership with the Everester Observatory, featuring interactive sessions, live stargazing, and guest speakers. The event marked the formal launch of the club and ignited enthusiasm for astronomy within the student body.',
    ],
  },
  {
    title: 'Featured at Birla Public School Science Expo (2024)',
    description: [
      'Debuted at the annual school exhibition with a powerful, hands-on astronomy showcase:',
      '- Space Weather Simulation: Arduino-based models demonstrating solar flares, CMEs, auroras, and geomagnetic storms using sensors, LEDs, and buzzers.',
      '- Black Holes & Wormholes: 3D structures and LED visuals explaining gravitational lensing, spacetime distortion, and theoretical wormholes.',
      '- Lifecycle of Stars: A detailed, interactive model tracing star formation, evolution, and supernova endings. Engaged and educated peers, teachers, and visitors through live demonstrations and simplified astrophysics explanations.',
    ],
  },
  {
    title: 'Pioneered Student-Led Research & Model Projects in Astronomy',
    description: [
      'Focused on simplifying complex space science topics into accessible working models and visual displays, bringing topics like black holes, space weather, exoplanets, and the life cycle of stars to life for the school community.',
    ],
  },
];

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#0e152d',
  },
  container: {
    padding: 20,
  },
  backWrapper: {
    alignSelf: 'flex-start',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  content: {
    paddingVertical: 20,
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  achievementBlock: {
    marginBottom: 20,
  },
  subheading: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
  },
  bodyText: {
    color: 'white',
    marginTop: 5,
    textAlign: 'left',
  },
});
