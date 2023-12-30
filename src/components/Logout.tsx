import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from '../pages/Stack/SignIn';

const Logout = () => {
  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .then(() => <Login />)
      .catch(error => console.log('Error: ' + error));
  };
  return (
    <TouchableOpacity onPress={logOut}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default Logout;
