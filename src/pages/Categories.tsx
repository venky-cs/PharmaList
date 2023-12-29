import React from 'react';
import {View} from 'react-native';
import ShowCollections from '../components/ShowCollections';

function Categories() {
  return (
    <View>
      <ShowCollections collection="Category" />
    </View>
  );
}

export default Categories;
