import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { db } from '../components/config';
import CustomScrollView from '../components/CustomScroll';
import back from '../assets/Images/back.png';

export default function MemberForm({ navigation }) {
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [failedAttempts, setFailedAttempts] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    school: '',
    mobile: '',
    whatsapp: '',
    email: '',
    insta: '',
    interests: '',
    goals: '',
    hobbies: '',
    pastActivities: '',
  });

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const {
      name,
      grade,
      school,
      mobile,
      whatsapp,
      email,
      interests,
      goals,
      hobbies,
      pastActivities,
    } = formData;

    const allFilled =
      name.trim() &&
      grade.trim() &&
      school.trim() &&
      mobile.trim() &&
      whatsapp.trim() &&
      email.trim() &&
      interests.trim() &&
      goals.trim() &&
      hobbies.trim() &&
      pastActivities.trim();

    if (!allFilled) {
      if (failedAttempts < 3) {
        setFailedAttempts(failedAttempts + 1);

        // Calculate random position within visible area
        const maxLeft = screenWidth * 0.85 - 100; // approximate button width 100
        const maxTop = screenHeight * 0.3;

        setButtonPosition({
          top: Math.random() * maxTop,
          left: Math.random() * maxLeft,
        });
      } else {
        alert('Please fill in all required fields before submitting.');
        setFailedAttempts(0); // Reset attempts
        setButtonPosition({ top: 0, left: 0 }); // Reset button position
      }
      return;
    }

    // Valid submission
    setFailedAttempts(0);
    setButtonPosition({ top: 0, left: 0 });
    alert('Submitting... Please wait.');

    try {
      await db.collection('registrations').add(formData);
     alert('Success', 'Your information was submitted!');
      // Optionally, reset form here:
      // setFormData({ name: '', grade: '', school: '', mobile: '', whatsapp: '', email: '', insta: '', interests: '', goals: '', hobbies: '', pastActivities: '' });
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error', 'Something went wrong.');
    }
  };

  return (
    <CustomScrollView
      contentContainerStyle={{ padding: 20 }}
      style={{ backgroundColor: '#0e152d' }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={back} style={{ width: 30, height: 30, alignSelf: 'flex-start' }} />
      </TouchableOpacity>

      <Text style={[styles.titleText, { fontSize: screenWidth * 0.07 }]}>
        Membership Application Form
      </Text>

      {['name', 'grade', 'school', 'mobile', 'whatsapp', 'email', 'insta'].map(
        (field, index) => (
          <View
            key={index}
            style={[styles.inputContainer, { width: screenWidth * 0.85 }]}
          >
            <TextInput
              value={formData[field]}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              placeholderTextColor="#343c4c"
              style={[styles.input, { fontSize: screenWidth * 0.04 }]}
              onChangeText={(text) => handleChange(field, text)}
              keyboardType={
                field === 'mobile' || field === 'whatsapp'
                  ? 'phone-pad'
                  : field === 'email'
                  ? 'email-address'
                  : 'default'
              }
            />
          </View>
        )
      )}

      {['interests', 'goals', 'hobbies', 'pastActivities'].map((field, index) => (
        <View
          key={index}
          style={[styles.inputContainer, { width: screenWidth * 0.85 }]}
        >
          <TextInput
            value={formData[field]}
            placeholder={`Enter your ${field}`}
            placeholderTextColor="#343c4c"
            style={[styles.input, { fontSize: screenWidth * 0.04 }]}
            multiline
            numberOfLines={5}
            onChangeText={(text) => handleChange(field, text)}
          />
        </View>
      ))}

      <View
        style={[
          styles.buttonContainer,
          {
            transform: [
              { translateX: buttonPosition.left },
              { translateY: buttonPosition.top },
            ],
            width: screenWidth * 0.85,
          },
        ]}
      >
        <Button title="Submit" onPress={handleSubmit} color="#343c4c" />
      </View>
    </CustomScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#0e152d', // actual input text color
    backgroundColor: 'white',
    padding: 10,
    width: '100%', // full width of the container
  },
  titleText: {
    color: 'white',
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
