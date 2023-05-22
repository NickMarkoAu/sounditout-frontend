import CameraComponent from "../components/camera/CameraComponent";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const Camera = ({navigation} : {navigation: StackNavigationProp}) => {
  return(<CameraComponent navigation={navigation}/>);
}

export default Camera;