import { createStackNavigator } from 'react-navigation-stack';
import Camera from './src/pages/Camera';
import Feed from './src/pages/Feed';
import Search from './src/pages/Search';
import Profile from './src/pages/Profile';
import Playlist from './src/pages/Playlist'
import { createAppContainer } from 'react-navigation';
import Player from "./src/pages/Player";

// @ts-ignore
const AppStackNav = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      headerShown: false
    }
  },
  Camera: {
    screen: Camera,
    navigationOptions: {
      headerShown: false
    }
  },
  Player: {
    screen: Player,
    navigationOptions: {
      headerShown: false,
    }
  },
  Playlist: {
    screen: Playlist,
    navigationOptions: {
      headerShown: false,
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(AppStackNav);