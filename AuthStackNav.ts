import {createAppContainer} from 'react-navigation';
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import {createStackNavigator} from "react-navigation-stack";
import InviteCode from "./src/screens/InviteCode";

const AuthStackNav = createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerShown: false
      }
    },
    InviteCode: {
      screen: InviteCode,
      navigationOptions: {
        headerShown: false,
      }
    }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      animationEnabled: true,
      animationTypeForReplace: 'push'
    },
  }
);
export default createAppContainer(AuthStackNav);