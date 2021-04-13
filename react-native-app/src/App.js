/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import Dashboard from './Dashboard';
import History from './History';
import Result from './Result';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();

export default function App() {
  const permission = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
  };

  useEffect(() => {
    permission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
