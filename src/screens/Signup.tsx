import {View} from "react-native";
import SignupComponent from "../components/signup/SignupComponent";

const Signup = ({navigation}) => {
  return (
    <View>
      <SignupComponent navigation={navigation}/>
    </View>
  );
}

export default Signup;