import {createAppContainer} from 'react-navigation';
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
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