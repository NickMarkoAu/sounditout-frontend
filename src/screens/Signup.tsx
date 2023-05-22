import {View} from "react-native";
import SignupComponent from "../components/signup/SignupComponent";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";

const Signup = ({navigation}: {navigation: StackNavigationProp}) => {
  return (
    <View>
      <SignupComponent navigation={navigation}/>
    </View>
  );
}

export default Signup;