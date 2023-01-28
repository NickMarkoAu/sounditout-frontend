import React from "react";
import {Pressable, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

export default class NavButton extends React.Component<{ onPress: () => void, icon: any, styles: any, size: number }> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.styles.IconBehave}>
          <FontAwesomeIcon icon={this.props.icon} color="#F6BD60" size={this.props.size}/>
      </TouchableOpacity>
    );
  }
}