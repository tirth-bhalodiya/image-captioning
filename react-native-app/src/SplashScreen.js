import React from 'react';
import {Image, View} from 'react-native';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Dashboard');
  }, 2000);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{flex: 1, height: '100%', width: '100%'}}
        source={require('./Logo.png')}></Image>
    </View>
  );
};

export default SplashScreen;
