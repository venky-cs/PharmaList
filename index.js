/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';

const AppComponent = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => AppComponent);
