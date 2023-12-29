/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ShowProduct from './src/components/ShowProduct';
import Login from './src/components/Login';
const Stack = createStackNavigator();
const AppComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Main"
          component={App}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Product" component={ShowProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => AppComponent);
