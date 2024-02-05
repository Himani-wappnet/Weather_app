// CustomTextInput.js

import React from 'react';
import {View, TextInput} from 'react-native';

const CustomTextInput = ({placeholder, onChangeText}) => {
  return (
    <View
      style={{
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
      }}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={{fontSize: 16, padding: 10}}
      />
    </View>
  );
};

export default CustomTextInput;
