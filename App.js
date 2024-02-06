import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignupwithGmail from './src/Authentications/SignupwithGmail';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from './src/screens/Profile';
import Logout from './src/Authentications/Logout';

const Drawer = createDrawerNavigator();
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

  const MyDrawer = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          // drawerActiveBackgroundColor: '#F4CFE0',
          drawerLabelStyle: {
            color: '#000000',
            fontWeight: '500',
            fontSize: 17,
            left: -13,
          },
          drawerStyle: {borderTopRightRadius: 20},
        }}>
        <Drawer.Screen
          options={{
            headerShown: false,
            drawerIcon: () => {
              return <Icon name="menu" size={35} color="#000" />;
            },
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
            drawerIcon: () => {
              return <MaterialIcons name="logout" size={35} color="#000" />;
            },
          }}
          name="Logout"
          component={Logout}
        />
        {/* Other screens for the Drawer navigator */}
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!authState ? (
          <>
            <Stack.Screen name="MyDrawer" component={MyDrawer} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignupwithGmail" component={SignupwithGmail} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
