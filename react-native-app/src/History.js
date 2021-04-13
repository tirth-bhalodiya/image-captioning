import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Text,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

const History = ({navigation}) => {
  const [isAvalible, setIsAvalible] = useState(false);
  const [history, setHistory] = useState(null);
  const cardBodyGen = (image, caption) => {
    return (
      <Card>
        <CardItem cardBody>
          <Image
            source={{
              uri: image,
            }}
            style={{height: 200, width: null, flex: 1}}
          />
        </CardItem>
        <CardItem>
          <Body>
            <Button transparent>
              <Text>{caption}</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    );
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('history_arr');
      const x = await JSON.parse(jsonValue);
      await setHistory(x);
      await setIsAvalible(true);
    } catch (e) {
      console.log('x', e);
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, [isAvalible]);

  if (isAvalible === true) {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>History </Title>
          </Body>
        </Header>
        <Content>
          {history.map(item => {
            return cardBodyGen(item.image, item.capion);
          })}
        </Content>
      </Container>
    );
  } else {
    return (
      <View style={styles.screenContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default History;
