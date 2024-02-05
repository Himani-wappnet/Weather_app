import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const Logout = ({navigation}) => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await auth().signOut();
        console.log('User signed out successfully');
        // You can add additional cleanup or navigation logic here
        navigation.replace('SignupwithGmail'); // Navigate to the signup screen
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    handleLogout(); // Call the logout function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once
};

export default Logout;
