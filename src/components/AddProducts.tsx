import React, {useState} from 'react';
import {View, Image, Alert, ActivityIndicator} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  uploadImageToFirebase,
  addDataToFirestore,
} from '../utils/firebaseUtils';
import {Input, Button, Text} from '@rneui/themed';

function AddProducts(closeDialog) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChooseImage = async () => {
    const options = {};
    setImageError(null);

    const result = await launchImageLibrary(options);
    if (result && result.assets.length) {
      setImage(result?.assets?.[0]);
    }
  };

  const handleUpload = async () => {
    if (title == '') {
      setTitleError(`Please Enter Product Name`);
      return;
    }
    if (price == '') {
      setPriceError(`Please Enter Product Price`);
      return;
    }
    if (image == null) {
      setImageError(`Please Select Product Image`);
      return;
    }
    setLoading(true);
    try {
      // Upload image to Firebase Storage
      const imageURL = await uploadImageToFirebase(image);

      // Add title and image URL to Firestore
      await addDataToFirestore({title, imageURL, collection});
      setLoading(false);

      Alert.alert('Success', `${collection} created successfully!`);
    } catch (error) {
      setLoading(false);
      console.error('Error uploading data:', error);
      Alert.alert('Error', 'Failed to upload data. Please try again.');
    } finally {
      closeDialog();
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Input
        placeholder={`Enter Product Name`}
        value={title}
        onChangeText={text => {
          setTitle(text);
          setTitleError('');
        }}
        errorStyle={{color: 'red'}}
        errorMessage={titleError}
      />
      <Input
        placeholder={`Enter Product Price`}
        value={price}
        onChangeText={text => {
          if (/^\d+$/.test(text.toString())) {
            setPrice(text);
            setPriceError('');
          }
        }}
        keyboardType="numeric"
        errorStyle={{color: 'red'}}
        errorMessage={priceError}
      />
      <Button
        title="Choose Image"
        buttonStyle={{
          borderColor: 'rgba(78, 116, 289, 1)',
        }}
        type="outline"
        raised
        titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
        containerStyle={{
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={handleChooseImage}
      />
      {imageError && <Text style={{color: 'red'}}>{imageError}</Text>}
      {image && (
        <View
          style={{
            alignItems: 'center', // Center the image horizontally
            justifyContent: 'center', // Center the image vertically
            marginBottom: 10,
          }}>
          <Image
            source={{uri: image?.uri}}
            style={{
              width: 150,
              height: 200,
              borderWidth: 2, // Set border width
              borderColor: 'black', // Set border color
            }}
          />
        </View>
      )}
      <Button
        style={{marginTop: 10}}
        title={`Add Products`}
        onPress={handleUpload}
      />
    </View>
  );
}

export default AddProducts;
