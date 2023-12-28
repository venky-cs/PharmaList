import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

function Login() {
  type userType = {
    email: string;
    password: string;
  };
  const [user, setUser] = useState<null | userType>({email: '', password: ''});

  const handleChange = (field, value) => {
    setUser(prevState => ({...prevState, [field]: value}));
  };
  const signIn = () => {
    console.log('User', user?.email, user?.password);
    auth()
      .signInWithEmailAndPassword(user?.email, user?.password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={user?.email}
        onChangeText={email => handleChange('email', email)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={user?.password}
        onChangeText={password => handleChange('password', password)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText} onPress={signIn}>
          {' '}
          Submit{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    backgroundColor: 'black',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
