/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Result from './Result';
import Camera from './Camera';
import Dashboard from './Dashboard'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Text, Container, Content, ImageBackground, View, Image
} from 'react-native';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

function Dash(){
  return(
    <Dashboard/>
  );
}
function SplashScreen({navigation}){
  setTimeout (() =>{
    navigation.replace('Dashboard');
  },2000);
  return(
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <Image style={{flex: 1, height: '100%', width: '100%'}} source={require('./Logo.png')}>
      </Image>
    </View>
  );
}
const Stack = createStackNavigator();

export default function App () {
  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Dashboard" component={Dash} />
      </Stack.Navigator>  
   </NavigationContainer>
  );
};
