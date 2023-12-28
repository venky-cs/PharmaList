import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import Brands from './src/pages/Brands';
import Login from './src/components/Login';
import Categories from './src/pages/Categories';
import Products from './src/pages/Products';

const Tab = createMaterialTopTabNavigator();
const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <Login />;
  }
  return (
    <Tab.Navigator initialRouteName="Products">
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Brands" component={Brands} />
      <Tab.Screen name="Categories" component={Categories} />
    </Tab.Navigator>
  );
};

export default App;
