import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
//   import CustomDropdown from '../Components/CustomDropdown';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignupwithGmail = () => {
  // const [Statesvalue, setStatesvalue] = useState('');
  // const onChangeState = (text, bool) => {
  //   setStatesvalue(text);
  //   // setScroll(bool);
  // };
  //   const navigation = useNavigation();
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState(null);

  // const dropDown = [
  //   {sevice: 'Laptop'},
  //   {sevice: 'Refrigerator'},
  //   {sevice: 'Washing Machine'},
  //   {sevice: 'Mobile Phone'},
  //   {sevice: 'Mobile Phone'},
  //   {sevice: 'Mobile Phone'},
  //   {sevice: 'Mobile Phone'},
  //   {sevice: 'Mobile Phone'},
  //   {sevice: 'Mobile Phone'},
  // ];

  useEffect(() => {
    // Request location permission when the component mounts
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Get the user's current location once permission is granted
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setLocation({latitude, longitude});
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const loginn = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        handleSignUp();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const handleSignUp = () => {
    const currentUser = auth().currentUser;

    if (currentUser && name !== '') {
      firestore().collection('Partners').doc(currentUser.uid).set({
        phonenumber: phoneNumber,
        pid: currentUser.uid,
        name: name,
        location: location,
      });
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            height: windowHeight,
            justifyContent: 'center',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                borderBottomWidth: 1,
                width: '75%',
                flexDirection: 'row',
              }}>
              <TextInput
                placeholder="Enter your name"
                onChangeText={val => setname(val)}
                value={name}
              />
              {/* <View style={{ position: "absolute", right: 0, top: 18 }}>
                          <FontAwesome name="user" size={20} color="black" />
                        </View> */}
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                width: '75%',
                flexDirection: 'row',
              }}>
              <TextInput
                placeholder="Enter your Email"
                onChangeText={val => setEmail(val)}
                value={email}
              />

              {/* <View style={{ position: "absolute", right: 0, top: 18 }}>
                          <Entypo name="mail" size={20} color="black" />
                        </View> */}
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                width: '75%',
                flexDirection: 'row',
              }}>
              <TextInput
                // style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                width: '75%',
                flexDirection: 'row',
              }}>
              <TextInput
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
              />
            </View>
          </View>
          {/* <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View style={{width: '80%', marginTop: 15}}>
                  <CustomDropdown
                    placeholdertext={
                      Statesvalue != '' ? Statesvalue : 'Select Service'
                    }
                    dataitems={dropDown}
                    onChangeSelect={onChangeState}
                  />
                </View>
              </View> */}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 35,
                width: '50%',
                borderWidth: 1,
                borderRadius: 20,
                height: 50,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // handleSignUp();
                  loginn();
                }}>
                <Text>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupwithGmail;
