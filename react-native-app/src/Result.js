import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Title,
} from 'native-base';
import React from 'react';
import {Image, Text} from 'react-native';
import Tts from 'react-native-tts';
const Result = ({navigation, route}) => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('history_arr');
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const storeData = async obj => {
    const data = (await getData()) || [];
    try {
      let pp = null;
      if (data.length != 0) {
        pp = [obj].concat(data);
      } else pp = [obj];
      const jsonValue = JSON.stringify(pp);
      await AsyncStorage.setItem('history_arr', jsonValue);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };

  const result = route.params.response.capion;
  const imagepath = route.params.image.path;
  storeData({image: imagepath, capion: result});
  const mySpeak = text => {
    Tts.speak(text);
  };
  mySpeak(result);
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Result </Title>
        </Body>
      </Header>
      <Content style={{padding: 10}}>
        <Image
          style={{resizeMode: 'contain', height: 400, width: 400}}
          source={{
            uri: imagepath,
          }}
        />
        <Text
          onPress={() => mySpeak(result)}
          style={{color: 'black', fontSize: 20, alignItems: 'center'}}>
          {result}
        </Text>
      </Content>
    </Container>
  );
};

export default Result;
