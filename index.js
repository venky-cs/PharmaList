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
import SignIn from './src/pages/Stack/SignIn';
import SignUp from './src/pages/Stack/SignUp';
import ShowProductByCollection from './src/components/ShowProductByCollection';
import AddProducts from './src/components/AddProducts';
import AddCollection from './src/components/AddCollection';

const Stack = createStackNavigator();
const AppComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={App}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Product" component={ShowProduct} />
        <Stack.Screen name="Brand" component={ShowProductByCollection} />
        <Stack.Screen name="Category" component={ShowProductByCollection} />
        <Stack.Screen name="AddProduct" component={AddProducts} />
        <Stack.Screen name="AddBrand" component={AddCollection} />
        <Stack.Screen name="AddCategory" component={AddCollection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => AppComponent);
