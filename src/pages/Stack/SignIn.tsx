import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function SignIn() {
  type userType = {
    email: string;
    password: string;
  };
  const [user, setUser] = useState<null | userType>({email: '', password: ''});
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    setError('');
  }, [user?.email, user?.password]);

  const handleChange = (field, value) => {
    setUser(prevState => ({...prevState, [field]: value}));
  };
  const signIn = () => {
    if (!user?.email || !user?.password) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);

    console.log('User', user?.email, user?.password);
    auth()
      .signInWithEmailAndPassword(user?.email, user?.password)
      .then(() => {
        console.log('User signed in!');
        navigation.navigate('Main');
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/invalid-email') {
          setError('Invalid email address.');
        } else if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          setError('Invalid email or password.');
        } else {
          setError('An error occurred. Please try again.');
          console.error(error);
        }
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
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={signIn}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 10,
    height: 40,
    width: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    marginRight: 10,
    color: '#555',
  },
  signupButton: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
