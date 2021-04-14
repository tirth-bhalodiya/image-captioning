import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const Dashboard = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadAndPredict = (image, navigation) => {
    console.log('image', image);
    const URL = `http://describer.ddns.net/predict`;

    const data = new FormData();
    data.append('file', {
      name: 'file',
      uri: image.path,
      type: 'image/jpeg',
    });

    fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        console.log('image uploaded');
        console.log(response);
        setIsLoading(false);
        navigation.navigate('Result', {response, image});
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        alert(err);
      });
  };
  const takePicture = () => {
    // console.warn('Take Photo');
    ImagePicker.openCamera({
      cropping: true,
    }).then(image => {
      setIsLoading(true);
      uploadAndPredict(image, navigation);
    });
  };

  const ShowHistory = () => {
    navigation.navigate('History');
  };
  const chooseFromGallery = () => {
    // console.warn('Choose from Gallery');
    ImagePicker.openPicker({
      cropping: true,
    }).then(image => {
      setIsLoading(true);
      uploadAndPredict(image, navigation);
    });
  };
  if (isLoading === true) {
    return (
      <View style={styles.screenContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  } else {
    return (
      <View style={styles.screenContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 50, color: 'orange'}}>
            Dashboard
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => chooseFromGallery()}
          style={styles.capture}>
          <Text style={styles.text}> Upload Image </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => takePicture()} style={styles.capture}>
          <Text style={styles.text}> Take Photo </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ShowHistory()} style={styles.capture}>
          <Text style={styles.text}> Show History </Text>
        </TouchableOpacity>
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
  text: {
    fontSize: 20,
  },
  capture: {
    display: 'flex',
    borderRadius: 5,
    fontFamily: 'Callibri',
    backgroundColor: 'skyblue',
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Dashboard;
