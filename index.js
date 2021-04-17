import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import LikedList from './src/screens/liked-list';

AppRegistry.registerComponent(appName, () => LikedList);
