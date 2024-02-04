import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignupwithGmail from './src/Authentications/SignupwithGmail';

const Stack = createStackNavigator();

const App = () => {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Unsubscribe on component unmount
  }, []);

  function onAuthStateChanged(user) {
    if (user) {
      setAuthState(true);
      console.log('userrrrrrrr', user.uid);
      // setTimeout(() => {
      //   firestore()
      //     .collection('Partners')
      //     .doc(user.uid)
      //     .get()
      //     .then(documentSnapshot => {
      //       if (documentSnapshot.exists) {
      //         console.log('himaniiiiii', documentSnapshot.data());
      //         setUserData(documentSnapshot.data());
      //       } else {
      //         console.log('Document does not exist');
      //       }
      //     });
      // }, 1000);
    } else {
      setAuthState(false);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!authState ? (
          <>
            <Stack.Screen name="SignupwithGmail" component={SignupwithGmail} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
