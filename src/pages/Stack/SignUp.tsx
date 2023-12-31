import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {navigationRef} from '../../utils/navigationRef';

function SignUp() {
  type userType = {
    email: string;
    password: string;
    name: string;
  };
  const [user, setUser] = useState<null | userType>({
    email: '',
    password: '',
    name: '',
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (auth().currentUser) {
      navigation?.navigate('Main');
    }
  }, [navigation]);

  useEffect(() => {
    if (auth().currentUser) {
      navigationRef?.current?.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }
  }, [navigationRef]);

  const handleChange = (field, value) => {
    setUser(prevState => ({...prevState, [field]: value}));
  };
  const signUp = async () => {
    console.log('User', user?.email, user?.password);
    setLoading(true);
    setError('');
    try {
      if (!user?.name || !user?.email || !user?.password) {
        throw new Error('Name, email, and password are required.');
      }

      const authUser = await auth().createUserWithEmailAndPassword(
        user?.email,
        user?.password,
      );

      // Add user data to Firestore
      await firestore().collection('users').doc(authUser.user.uid).set({
        email: user?.email,
        name: user?.name,
        isAdmin: false,
      });

      Alert.alert('User account created & signed in!');
      navigationRef.current?.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={user?.name}
        onChangeText={name => handleChange('name', name)}
        placeholder="Name"
      />
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
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={signUp}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}> Sign Up </Text>
        )}
      </TouchableOpacity>
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#2c3e50',
    padding: 15,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginTextContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    marginRight: 10,
    color: '#555',
  },
  loginButton: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
