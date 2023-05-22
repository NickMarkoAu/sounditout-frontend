import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, Linking} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCameraRetro, faArrowCircleLeft, faImages, faRefresh} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "../../state/hooks";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const CameraComponent= ({ navigation } : {navigation: StackNavigationProp}) => {
  const {colours} = useTheme;
  const onComplete = navigation.state.params.onComplete;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cameraContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    fixedRatio: {
      flex: 1,
    },
    button: {
      flex: 0.1,
      padding: 10,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    backButton: {
      position: "absolute",
      left: 20,
      top: 60
    },
    actionButtonContainer: {
      width: "100%",
      position: "absolute",
      bottom: 15,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: 'center', //Centered vertically
    }
  });


  const [galleryPermission, setGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const imagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(imagePermission.status === 'granted');
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync()
      setImageUri(photo.uri);
      console.log(photo.uri);
    }
  };

  useEffect(() => {
    console.log(imageUri);
    if(imageUri !== null)
      onComplete(imageUri);
    // navigation.navigate(onCompletePage, {imageUri});
  }, [imageUri]);

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const pickImage = async () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }).then((result) => {
      setImageUri(result.assets[0].uri);
    });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio="16:9"
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowCircleLeft} color={colours.primary} size={50}/>
      </TouchableOpacity>

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity onPress={pickImage}>
          <FontAwesomeIcon icon={faImages} color={colours.primary} size={60}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture}>
          <FontAwesomeIcon icon={faCameraRetro} color={colours.primary} size={80}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCameraType}>
          <FontAwesomeIcon icon={faRefresh} color={colours.primary} size={60}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}



export default CameraComponent;