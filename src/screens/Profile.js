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
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useEffect, useState, useCallback} from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import CustomTextInput from '../components/CustomTextInput';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const EditProfile = ({navigation}) => {
  const [Name, setName] = useState('');
  const [accontName, setAccountName] = useState('');
  const [image, setImage] = useState(null);
  const [uploadUri, setUploadUri] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);
  //   var ProfileImg = '';
  //   const {name, accountName, profileImage} = route.params;

  // const handleSnapPress = index => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     // Update state with the selected image URI
  //     setUploadUri(image.path);
  //   });
  // };

  // useEffect(() => {
  //   checkPermissions();
  // }, []);

  const showAlertAndRequestPermission = async () => {
    Alert.alert(
      'Permission Alert',
      'Select an option to upload a photo',
      [
        {
          text: 'Take a Photo',
          onPress: async () => await handleOptionSelected('Take a Photo'),
        },
        {
          text: 'Upload from Gallery',
          onPress: async () =>
            await handleOptionSelected('Upload from Gallery'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const handleOptionSelected = async option => {
    if (option === 'Upload from Gallery') {
      await openGallery();
    } else if (option === 'Take a Photo') {
      await openCamera();
    }
  };

  const requestGalleryPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    console.log('granted', RESULTS.GRANTED);
    console.log('result', result);
    if (result !== 'granted') {
      // Handle denied or blocked permission
      console.log('permission handle /////////////');
    }
  };

  const openGallery = async () => {
    await requestGalleryPermission();

    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo', // Specify media type
      });
      setUploadUri(image.path);
    } catch (error) {
      console.error('Error opening gallery:', error);
    }
  };

  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      setUploadUri(image.path);
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  const uploadImageToFirebase = async imagePath => {
    try {
      const filename = imagePath.substring(imagePath.lastIndexOf('/') + 1);
      console.log('file name ', filename);
      const storageRef = storage().ref(`profileImages/${filename}`);
      await storageRef.putFile(imagePath);
      const downloadURL = await storageRef.getDownloadURL();
      console.log('download url ', downloadURL);
      // Show alert message
      Alert.alert('Success', 'The profile image is updated.');

      // Navigate to the homepage
      navigation.navigate('Home', {updatedImageURL: downloadURL});
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };

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
        <TouchableOpacity
          onPress={() => {
            // ToastMessage();
            navigation.goBack();
          }}>
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
            if (uploadUri) {
              uploadImageToFirebase(uploadUri);
            } else {
              Alert.alert('Error', 'Please select an image.');
            }
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
          onPress={() => showAlertAndRequestPermission()}
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
          {uploadUri != null ? (
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                justifyContent: 'center',
                padding: 15,
                marginBottom: 0,
              }}
              source={{uri: uploadUri}}
            />
          ) : null}
          {/* <Text>himani</Text> */}
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
