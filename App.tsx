import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import auth from '@react-native-firebase/auth';
import Brands from './src/pages/Brands';
import Login from './src/pages/Stack/SignIn';
import Categories from './src/pages/Categories';
import Products from './src/pages/Products';
import User from './src/pages/User';

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
    <Tab.Navigator
      initialRouteName="Products"
      screenOptions={({route}) => ({
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
          margin: 0,
          padding: 0,
        },

        tabBarBadgeStyle: {
          backgroundColor: '#22358e',
          color: '#fff',
          top: 0,
        },
      })}>
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Brands" component={Brands} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export default App;
