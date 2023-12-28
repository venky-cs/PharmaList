import React, {useState} from 'react';
import {View} from 'react-native';
import {Card, Button, Dialog} from '@rneui/themed';
import AddProducts from '../components/AddProducts';

const Products = () => {
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Button
        title={`Add Products`}
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
        onPress={toggleDialog}
      />
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title={`Add Products`} />
        <AddProducts closeDialog={toggleDialog} />
      </Dialog>
    </>
  );
};

export default Products;
