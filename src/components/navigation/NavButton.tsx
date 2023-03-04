import React from "react";
import {TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useTheme} from "../../state/hooks";

export default class NavButton extends React.Component<{ onPress: () => void, icon: any, styles: any, size: number }> {
  render() {
    const {colours} = useTheme
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.styles.IconBehave}>
          <FontAwesomeIcon icon={this.props.icon} color={colours.primary} size={this.props.size}/>
      </TouchableOpacity>
    );
  }
}