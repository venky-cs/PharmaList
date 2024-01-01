/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ShowProduct from './src/components/ShowProduct';
import SignIn from './src/pages/Stack/SignIn';
import SignUp from './src/pages/Stack/SignUp';
import ShowProductByCollection from './src/components/ShowProductByCollection';
import AddProduct from './src/components/AddProduct';
import AddCollection from './src/components/AddCollection';
import {navigationRef} from './src/utils/navigationRef';
import auth from '@react-native-firebase/auth';
import EditProduct from './src/components/EditProduct';

StatusBar.setBarStyle('light-content');
const Stack = createStackNavigator();
const AppComponent = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={auth().currentUser ? 'Main' : 'SignIn'}>
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
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="AddBrand" component={AddCollection} />
        <Stack.Screen name="AddCategory" component={AddCollection} />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
AppRegistry.registerComponent(appName, () => AppComponent);
