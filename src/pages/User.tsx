import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function UserPage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    // Fetch current user information
    const fetchUserInfo = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();
          const userData = userDoc.data();
          setUserInfo({
            name: userData.name,
            email: currentUser.email,
            role: userData.isAdmin ? 'Admin' : 'User',
          });
        }
      } catch (error) {
        console.error('Error fetching user information', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      // You may want to navigate to the login screen or another appropriate screen
      Alert.alert('Logged out successfully');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoLabel}>Name:</Text>
        <Text style={styles.userInfoText}>{userInfo.name}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoLabel}>Email:</Text>
        <Text style={styles.userInfoText}>{userInfo.email}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoLabel}>Role:</Text>
        <Text style={styles.userInfoText}>{userInfo.role}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  userInfoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '80%',
  },
  userInfoLabel: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: '#333',
    textAlign: 'right',
  },
  userInfoText: {
    flex: 2,
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
