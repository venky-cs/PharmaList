import React, {useState} from 'react';
import {
  View,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  uploadImageToFirebase,
  addProductToFirestore,
} from '../utils/firebaseUtils';
import {Input, Button, Text} from '@rneui/themed';
import Dropdown from './Dropdown';
import useFirestoreState from '../Hooks/useFirestoreState';
import {useNavigation} from '@react-navigation/native';

function AddProducts() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');
  const [loading, setLoading] = useState(false);
  const [brandCollection, brandCollectionLoading] = useFirestoreState('Brand');
  const [categoryCollection, categoryCollectionLoading] =
    useFirestoreState('Category');
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brandIdError, setBrandIdError] = useState('');
  const [categoryIdError, setCategoryIdError] = useState('');
  const navigation = useNavigation();

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
    if (!brandId) {
      setBrandIdError(`Please Select Product Brand`);
      return;
    }
    if (!categoryId) {
      setCategoryIdError(`Please Select Product Category`);
      return;
    }
    setLoading(true);
    try {
      // Upload image to Firebase Storage
      const imageURL = await uploadImageToFirebase(image);
      const Product = 'Product';

      // Add title and image URL to Firestore
      await addProductToFirestore({
        title,
        imageURL,
        price,
        brandId,
        categoryId,
      });
      setLoading(false);

      Alert.alert('Success', `Product created successfully!`);
    } catch (error) {
      setLoading(false);
      console.error('Error uploading data:', error);
      Alert.alert('Error', 'Failed to upload data. Please try again.');
    } finally {
      navigation.navigate('Products');
    }
  };

  if (loading || brandCollectionLoading || categoryCollectionLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Input
          style={styles.input}
          placeholder={`Enter Product Name`}
          value={title}
          onChangeText={text => {
            setTitle(text);
            setTitleError('');
          }}
          errorStyle={{color: 'red'}}
          errorMessage={titleError}
          placeholderTextColor="black"
          color="black"
        />
        <Input
          style={styles.input}
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
          placeholderTextColor="black"
          color="black"
        />
        <Dropdown
          collection={brandCollection}
          title={'Brand'}
          updateValue={val => setBrandId(val)}
          error={brandIdError}
          updateError={() => setBrandIdError('')}
          style={{color: 'black'}}
        />
        <Dropdown
          collection={categoryCollection}
          title={'Category'}
          updateValue={val => setCategoryId(val)}
          error={categoryIdError}
          updateError={() => setCategoryIdError('')}
          style={{color: 'black'}}
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
          <View style={styles.imageContainer}>
            <Image source={{uri: image?.uri}} style={styles.image} />
          </View>
        )}

        <Button
          style={styles.button}
          title={`Add Products`}
          onPress={handleUpload}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Set background color
  },
  input: {
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
  },
  button: {
    marginTop: 10,
  },
});

export default AddProducts;
