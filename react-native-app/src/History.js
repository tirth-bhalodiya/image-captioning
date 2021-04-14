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
  Right,
  Text,
  Title,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

const History = ({navigation}) => {
  const [isAvalible, setIsAvalible] = useState(false);
  const [history, setHistory] = useState(null);
  const cardBodyGen = (image, caption, key) => {
    return (
      <Card key={key} style={{padding: 10, marginBottom: 10}}>
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

  const clearHistory = () => {
    AsyncStorage.removeItem('history_arr');
    console.log('History Cleared');
    setHistory(null);
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
          <Right>
            <Button onPress={() => clearHistory()}>
              <Text> Clear History </Text>
            </Button>
          </Right>
        </Header>
        <Content>
          {history === null ? (
            <Container>
              <Text> No data found </Text>
            </Container>
          ) : (
            history.map((item, i) => {
              return cardBodyGen(item.image, item.capion, i);
            })
          )}
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
