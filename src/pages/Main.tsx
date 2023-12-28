import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Text, View, ActivityIndicator} from 'react-native';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Brands')
      .onSnapshot(querySnapshot => {
        const brands = [];

        querySnapshot.forEach(documentSnapshot => {
          brands.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setBrands(brands);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  console.log('brands', brands);
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <Text>tr</Text>
    </View>
  );
}

export default Brands;
