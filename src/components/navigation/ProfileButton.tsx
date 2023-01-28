import React from "react";
import {Image, Pressable, View, StyleSheet, TouchableOpacity} from "react-native";

export default class ProfileButton extends React.Component<{ onPress: () => void }> {
  render() {
    const styles = StyleSheet.create({
        IconBehave: {
          padding: 8
        }, Circle: {
          width: 20,
          height: 20,
          flex: 1,
          alignSelf: 'stretch',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center' //Centered vertically
        }, CircleImage: {
          width: 30,
          height: 30,
          borderRadius: 50,
          borderWidth:1,
          borderColor: "#F6BD60",
          justifyContent: 'center',
          alignItems: 'center' //Centered vertically
        }
      });
    return (
      <Pressable onPress={this.props.onPress} style={styles.IconBehave}
                       android_ripple={{borderless: true, radius: 50}}>
      <View style={styles.Circle}>
        <TouchableOpacity>
        <Image
          style={styles.CircleImage}
          source={require("../../../assets/test-profile.png")}
        />
        </TouchableOpacity>
      </View>
    </Pressable>
    );
  }
}