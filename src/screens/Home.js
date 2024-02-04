import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {deviceHeight, deviceWidth} from './Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Home = props => {
  const [city, setCity] = useState('');
  const [locationData, setLocationData] = useState(null);

  //   const handleLocationPress = () => {
  //     const mapUrl = 'geo:0,0?q=Current+Location';
  //     Linking.openURL(mapUrl).catch(error =>
  //       console.error('Error opening Google Maps:', error),
  //     );
  //   };
  const handleLocationPress = () => {
    if (locationData) {
      // Use the latitude and longitude from Firestore for the map URL
      const mapUrl = `geo:${locationData.latitude},${locationData.longitude}?q=Current+Location`;

      Linking.openURL(mapUrl).catch(error =>
        console.error('Error opening Google Maps:', error),
      );
    } else {
      // Handle the case when location data is not available
      console.warn('Location data not available');
    }
  };

  useEffect(() => {
    // Fetch location data from Firestore when the component mounts
    fetchLocationFromFirestore();
  }, []);

  const fetchLocationFromFirestore = async () => {
    try {
      // Assuming the user is already authenticated and you have some identifier (e.g., uid)
      const currentUser = auth().currentUser; // replace with your actual user identifier

      const userDoc = await firestore()
        .collection('Partners')
        .doc(currentUser.uid)
        .get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const userLocation = userData.location;
        setLocationData(userLocation);
      }
    } catch (error) {
      console.error('Error fetching location from Firestore:', error);
    }
  };

  const cities = [
    {
      name: 'New Delhi',
      image: require('../assests/images/image3.jpg'),
    },
    {
      name: 'New York',
      image: require('../assests/images/image4.jpg'),
    },
    {
      name: 'London',
      image: require('../assests/images/image5.jpg'),
    },
    {
      name: 'San Francisco',
      image: require('../assests/images/image6.jpg'),
    },
    {
      name: 'New Jersey',
      image: require('../assests/images/image7.jpg'),
    },
  ];

  return (
    <View>
      <ImageBackground
        source={require('../assests/images/image2.jpg')}
        style={{height: deviceHeight, width: deviceWidth}}
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
      />
      <View
        style={{
          position: 'absolute',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: deviceWidth - 20,
          }}>
          <Icon name="menu" size={46} color="white" />
          <Image
            source={require('../assests/images/user.jpg')}
            style={{height: 46, width: 46, borderRadius: 50}}
          />
        </View>

        <View style={{paddingHorizontal: 20, marginTop: 100}}>
          <Text style={{fontSize: 40, color: 'white'}}>Hello</Text>
          <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
            Search the city by the name
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'white',
              marginTop: 16,
              paddingHorizontal: 10,
            }}>
            <TextInput
              value={city}
              onChangeText={val => setCity(val)}
              placeholder="Search City"
              placeholderTextColor="white"
              style={{paddingHorizontal: 10, color: 'white', fontSize: 16}}
            />
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Details', {name: city})
              }>
              <Icon name="search" size={22} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginTop: 220}}>
            <View style={{bottom: 5}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 25,
                  paddingHorizontal: 10,

                  marginBottom: 20,
                }}>
                My Locations
              </Text>
            </View>
            <TouchableOpacity onPress={handleLocationPress}>
              <Icon name="location" size={25} color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={cities}
            renderItem={({item}) => (
              <Card
                name={item.name}
                image={item.image}
                navigation={props.navigation}
              />
              //   <Text>himani</Text>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
