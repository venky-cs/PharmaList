import React from 'react';
import {Button} from '@rneui/themed';
import ShowProducts from '../components/ShowProducts';
import {useNavigation} from '@react-navigation/native';

const Products = () => {
  const navigation = useNavigation();
  const createProduct = () => {
    navigation.navigate('AddProduct');
  };
  return (
    <>
      <Button
        title={`Add Product`}
        buttonStyle={{
          borderColor: 'rgba(78, 116, 289, 1)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        type="outline"
        titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
        containerStyle={{
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={createProduct}
      />

      <ShowProducts />
    </>
  );
};

export default Products;
