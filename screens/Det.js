import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import CustomScrollView from '../components/CustomScroll';
import { db } from '../components/config'; // Firebase 9+ initialized app
import { collection, getDocs } from 'firebase/firestore';

export default function Det() {
  const { width } = useWindowDimensions();
  const sWidth = Math.min(width * 0.9, 500);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTempEvent = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'tempfevent'));
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          setEventData(docData);
        } else {
          console.warn('No documents found in tempfevent collection.');
        }
      } catch (error) {
        console.error('Error fetching tempfevent:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTempEvent();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  if (!eventData) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: 'white' }}>No event data found.</Text>
      </View>
    );
  }

  const { title, subtitle1, subtitle2, subtitle3, description, date, location } = eventData;

  return (
    <CustomScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <View style={[styles.section, { padding: width * 0.05 }]}>
        <Text style={[styles.title, { fontSize: sWidth * 0.08 }]}>{title}</Text>
        <Text style={[styles.subtitle, { fontSize: sWidth * 0.045 }]}>{subtitle1}</Text>
        <Text style={[styles.italicText, { fontSize: sWidth * 0.05 }]}>{subtitle2}</Text>
        <Text style={[styles.italicText, { fontSize: sWidth * 0.05 }]}>{subtitle3}</Text>
        <Text style={[styles.description, { fontSize: sWidth * 0.04 }]}>{description}</Text>

        <Text style={[styles.info, { fontSize: sWidth * 0.04, marginTop: 20 }]}>
          <Text style={{ fontWeight: 'bold' }}>Date: </Text>{date}
        </Text>
        <Text style={[styles.info, { fontSize: sWidth * 0.04, marginTop: 5 }]}>
          <Text style={{ fontWeight: 'bold' }}>Location: </Text>{location}
        </Text>
      </View>
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
  section: {
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
  info: {
    color: 'white',
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
