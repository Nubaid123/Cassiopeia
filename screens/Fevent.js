import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { db } from '../components/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import CustomScrollView from '../components/CustomScroll';
import EventCard from '../components/EventCard';
import back from '../assets/Images/back.png';
import carina from '../assets/Images/carina.png';
import artemis from '../assets/Images/artemis.png';
import past from '../assets/Images/past.png';

export default function Fevents({ navigation }) {
  const { width } = useWindowDimensions();
  const sWidth = Math.min(width * 0.9, 500);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageMap = {
    carina,
    artemis,
    past,
  };

  useEffect(() => {
    let retryCount = 0;

    const fetchEvents = async () => {
      setLoading(true);

      while (retryCount < 2) {
        try {
          const snapshot = await getDocs(collection(db, 'fevents'));

          if (!snapshot.empty) {
            const eventsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsList);
            break;
          } else {
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error('Error fetching future events:', error);
          break;
        }
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleEventPress = async (event) => {
    try {
      alert('This might take a while...');
      await addDoc(collection(db, 'tempfevent'), {
        ...event,
        timestamp: new Date(),
      });
      navigation.navigate('FeventD', { eventId: event.id });
    } catch (error) {
      console.error('Error saving to tempfevent:', error);
    }
  };

  return (
    <CustomScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={{ alignItems: 'center' }}>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : events.length === 0 ? (
          <Text style={styles.noEventsText}>No upcoming events available.</Text>
        ) : (
          events.map(event => (
            <EventCard
              key={event.id}
              image={imageMap[event.image] || past}
              text={event.title}
              date={event.date}
              onPress={() => handleEventPress(event)}
            />
          ))
        )}
      </View>
    </CustomScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  noEventsText: {
    color: '#fff',
    marginTop: 20,
  },
});
