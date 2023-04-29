import { createStackNavigator } from 'react-navigation-stack';
import Camera from './src/screens/Camera';
import Feed from './src/screens/Feed';
import Search from './src/screens/Search';
import Profile from './src/screens/Profile';
import Playlist from './src/screens/Playlist'
import { createAppContainer } from 'react-navigation';
import Player from "./src/screens/Player";
import Generate from './src/screens/Generate';
import CreatePost from './src/screens/CreatePost';
import EditProfile from "./src/screens/EditProfile";

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
  Generate: {
    screen: Generate,
    navigationOptions: {
      headerShown: false,
    }
  },
  CreatePost: {
    screen: CreatePost,
    navigationOptions: {
      headerShown: false,
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      headerShown: false,
    }
  }
});

export default createAppContainer(AppStackNav);