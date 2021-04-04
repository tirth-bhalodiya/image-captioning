import React from 'react';
import {
   Text,StyleSheet,View,Button, ImageBackground, TouchableOpacity
 } from 'react-native';
 import ImagePicker from 'react-native-image-crop-picker';
 import { RNCamera } from 'react-native-camera';
 
 const Dashboard = () => {
   const takePicture = () =>{
      // console.warn('Take Photo');
      ImagePicker.openCamera({
        cropping: true,
      }).then(image => {
        console.log(image);
      });
   }

   const chooseFromGallery = () => {
      // console.warn('Choose from Gallery');
      ImagePicker.openPicker({
        cropping: true,
      }).then(image => {
        console.log(image);
      });
   }
   return (
     <View style = {styles.screenContainer} >
      {/* <RNCamera androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
        }} /> */}
       <View style ={{alignItems: 'center'}}>
          <Text style ={{fontWeight: 'bold', fontSize: 40, color: 'orange'}}>Dashboard</Text>
       </View>
       <TouchableOpacity onPress={() => chooseFromGallery()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Upload Image </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => takePicture()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Take Photo </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ShowHistor()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Show History </Text>
        </TouchableOpacity>
         {/* <Button title = "Upload Image" />
         <Text>{"\n"}</Text>
         <Button title = "Camera" />
         <Text>{"\n"}</Text>
         <Button title = "Show History" /> */}
     </View>
   );
 };

 const styles = StyleSheet.create({
    
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        // marginRight: 80,
        // marginLeft: 80,
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
 