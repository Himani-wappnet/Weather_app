import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useEffect, useState, useCallback} from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import CustomTextInput from '../components/CustomTextInput';

const EditProfile = ({route, navigation}) => {
  const [Name, setName] = useState('');
  const [accontName, setAccountName] = useState('');
  const [image, setImage] = useState(null);
  const [Uploaduri, setUploaduri] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);
  //   var ProfileImg = '';
  //   const {name, accountName, profileImage} = route.params;

  return (
    // <ScrollView>
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic
            name="close-outline"
            style={{
              fontSize: 35,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Edit Profile
        </Text>
        <TouchableOpacity
          onPress={() => {
            // ToastMessage();
            navigation.goBack();
          }}>
          <Ionic
            name="checkmark"
            style={{
              fontSize: 35,
              color: '#3493D9',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        {/* {image != null ? <Image style={{
                      width: 80,
                      height: 80,
                      borderRadius: 100
                  }} source={{ uri: image }} /> : null} */}

        {/* {uploading ? (
                      <View style={{
                          justifyContent: 'center',
                          alignItems: 'center'
                      }}>
                          <Text>{transferred} % Completed!</Text>
                          <ActivityIndicator size="large" color="#0000ff" />
                      </View>
                  ) : ( */}

        <TouchableOpacity
          onPress={() => handleSnapPress(0)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: 100,
            padding: 15,
            margin: 10,
            backgroundColor: '#D9D9D9',
          }}>
          {/* {Uploaduri != null ? 
                          <Image style={{
                              width: 80,
                              height: 80,
                              borderRadius: 100,
                              justifyContent:'center',
                              padding:15,
                              marginBottom:10,
                          }} source={{ uri: Uploaduri }} /> 
                          : null} */}
          <Text>himani</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={{
              color: '#3493D9',
              marginTop: 10,
            }}>
            Profile name
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: 18,
        }}>
        <View style={styles.profileInfo}>
          <CustomTextInput
            placeholder="name"
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.profileInfo}>
          <CustomTextInput
            placeholder="accountName"
            onChangeText={text => setAccountName(text)}
          />
        </View>
        <View style={styles.profileInfo}>
          <CustomTextInput placeholder="Website" />
        </View>
        <View style={styles.profileInfo}>
          <CustomTextInput placeholder="Bio" />
        </View>
        <TouchableOpacity style={styles.logOut}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 10,
    fontSize: 16,
  },
  profileInfo: {
    width: windowWidth / 1.1,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#D9D9D9',
  },
  logOut: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 1.6,
    height: windowHeight / 17,
    borderRadius: 10,
    margin: 50,
    backgroundColor: '#D9D9D9',
  },
});
