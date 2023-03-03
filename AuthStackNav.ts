import {createAppContainer} from 'react-navigation';
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import {createStackNavigator} from "react-navigation-stack";

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
    }
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
      animationEnabled: true,
      animationTypeForReplace: 'pop'
    },
  }
);
export default createAppContainer(AuthStackNav);