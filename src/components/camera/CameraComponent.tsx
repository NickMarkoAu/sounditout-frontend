import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, Linking} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCameraRetro, faArrowCircleLeft, faImages, faRefresh} from "@fortawesome/free-solid-svg-icons";

const CameraComponent= ({ navigation }) => {
  const [cameraPermission, requestPermissions] = Camera.useCameraPermissions();

  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const [type, setType] = useState(CameraType.back);

  const requestPermissionAgain = () => {
    Linking.openSettings();
  }

  const permissionFunction = async () => {
    // here is how you can get the camera permission
    console.log('Camera permission', cameraPermission.status);
    if(!cameraPermission || cameraPermission.status !== 'granted') {
      await requestPermissions();
    }

    const imagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Image permission', imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== 'granted' ||
      cameraPermission?.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permissionFunction();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
    }
  };

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      //TODO fix this set image URI
      // setImageUri(result.assets.);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio="16:9"
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowCircleLeft} color="#F6BD60" size={50}/>
      </TouchableOpacity>

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity onPress={pickImage}>
          <FontAwesomeIcon icon={faImages} color="#F6BD60" size={60}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture}>
          <FontAwesomeIcon icon={faCameraRetro} color="#F6BD60" size={80}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCameraType}>
          <FontAwesomeIcon icon={faRefresh} color="#F6BD60" size={60}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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

export default CameraComponent;