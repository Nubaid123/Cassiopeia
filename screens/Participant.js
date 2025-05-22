import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
} from 'react-native';
import { db } from '../components/config';
import CustomScrollView from '../components/CustomScroll';

export default function Participant({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    school: '',
    mobile: '',
    email: '',
    nat: '', // Nationality
    res: '', // Country of Residence
    eventName: '', // Event name
  });

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch event name from tempfevent
  useEffect(() => {
    const fetchEventName = async () => {
      try {
        const snapshot = await db.collection('tempfevent').get();
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setFormData(prev => ({ ...prev, eventName: data.title || 'Untitled Event' }));
        }
      } catch (err) {
        console.error('Error fetching event name:', err);
      }
    };

    fetchEventName();

    const onChange = ({ window }) => {
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = email => {
    // Simple email regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateMobile = mobile => {
    // Example: check if 7-15 digits only
    const re = /^\d{7,15}$/;
    return re.test(mobile);
  };

  const handleSubmit = async () => {
    const { name, grade, school, mobile, email, nat, res } = formData;

    // Check if any field is empty
    if (!name || !grade || !school || !mobile || !email || !nat || !res) {
      alert('Incomplete Form', 'Please fill in all the fields before submitting.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validateMobile(mobile)) {
      alert('Invalid Mobile Number', 'Please enter a valid mobile number (7-15 digits).');
      return;
    }

    try {
      setIsSubmitting(true);
      alert('Submitting...', 'Please wait.');

      await db.collection('participants').add(formData);

      alert('Success!', 'Your information was submitted.');
      // Optionally, reset form after submission
      setFormData({
        name: '',
        grade: '',
        school: '',
        mobile: '',
        email: '',
        nat: '',
        res: '',
        eventName: formData.eventName,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding participant:', error);
      alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomScrollView
      contentContainerStyle={{ padding: 20 }}
      style={{ backgroundColor: '#0e152d' }}
      accessible={true}
      accessibilityLabel="Participant form screen"
    >
      <Text
        style={[styles.titleText, { fontSize: screenWidth * 0.07 }]}
        accessibilityRole="header"
      >
        Event Participant Form
      </Text>

      {['name', 'grade', 'school', 'mobile', 'email'].map((field, index) => (
        <View
          key={index}
          style={[styles.inputContainer, { width: screenWidth * 0.85 }]}
          accessible={true}
          accessibilityLabel={`${field.charAt(0).toUpperCase() + field.slice(1)} input`}
        >
          <TextInput
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            placeholderTextColor="#343c4c"
            style={[styles.input, { fontSize: screenWidth * 0.04 }]}
            onChangeText={text => handleChange(field, text)}
            value={formData[field]}
            keyboardType={
              field === 'mobile'
                ? 'phone-pad'
                : field === 'email'
                ? 'email-address'
                : 'default'
            }
            autoCapitalize={field === 'email' ? 'none' : 'sentences'}
            accessible={true}
            returnKeyType="done"
          />
        </View>
      ))}

      {/* Nationality */}
      <View
        style={[styles.inputContainer, { width: screenWidth * 0.85 }]}
        accessible={true}
        accessibilityLabel="Nationality input"
      >
        <TextInput
          placeholder="Nationality"
          placeholderTextColor="#343c4c"
          style={[styles.input, { fontSize: screenWidth * 0.04 }]}
          onChangeText={text => handleChange('nat', text)}
          value={formData.nat}
          autoCapitalize="words"
          accessible={true}
          returnKeyType="done"
        />
      </View>

      {/* Country of Residence */}
      <View
        style={[styles.inputContainer, { width: screenWidth * 0.85 }]}
        accessible={true}
        accessibilityLabel="Country of Residence input"
      >
        <TextInput
          placeholder="Country of Residence"
          placeholderTextColor="#343c4c"
          style={[styles.input, { fontSize: screenWidth * 0.04 }]}
          onChangeText={text => handleChange('res', text)}
          value={formData.res}
          autoCapitalize="words"
          accessible={true}
          returnKeyType="done"
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Button
          title={isSubmitting ? 'Submitting...' : 'Submit'}
          onPress={handleSubmit}
          disabled={isSubmitting}
          accessibilityLabel="Submit participant form button"
        />
      </View>
    </CustomScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#0e152d',
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
  },
  titleText: {
    color: 'white',
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
