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
import ShowProductByCollection from './src/components/ShowProductByCollection';

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
        <Stack.Screen name="Brand" component={ShowProductByCollection} />
        <Stack.Screen name="Category" component={ShowProductByCollection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => AppComponent);
