import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

function ShowProduct() {
  const [brandName, setBrandName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const route = useRoute();
  const {product} = route.params;
  console.log(product);
  const handleEdit = () => {
    // Implement your edit logic here
    Alert.alert(
      `Edit ${product.title}`,
      'Edit functionality will be implemented here.',
    );
  };

  useEffect(() => {
    getDocumentByIdFromBrandCollection(product.brandId);
    getDocumentByIdFromCategoryCollection(product.categoryId);
  }, [product]);

  const getDocumentByIdFromBrandCollection = async documentId => {
    try {
      const documentSnapshot = await firestore()
        .collection('Brand')
        .doc(documentId)
        .get();

      if (documentSnapshot.exists) {
        const documentData = {
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        };
        console.log('results: ', documentData);
        setBrandName(documentData?.title);
        return documentData;
      } else {
        console.log('Document does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  };
  const getDocumentByIdFromCategoryCollection = async documentId => {
    try {
      const documentSnapshot = await firestore()
        .collection('Category')
        .doc(documentId)
        .get();

      if (documentSnapshot.exists) {
        const documentData = {
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        };
        console.log('results: ', documentData);
        setCategoryName(documentData?.title);
        return documentData;
      } else {
        console.log('Document does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  };

  const handleDelete = () => {
    // Implement your delete logic here
    Alert.alert(
      `Delete ${product.title}`,
      'Delete functionality will be implemented here.',
    );
    // Alert.alert(
    //   'Confirm Deletion',
    //   'Are you sure you want to delete this product?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Delete',
    //       style: 'destructive',
    //       onPress: () => {
    //         // Delete the product and navigate back
    //         navigation.goBack();
    //       },
    //     },
    //   ],
    // );
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: product.imageURL}} style={styles.image} />
      <View style={styles.details}>
        {/* {filteredProperties.map(([key, value]) => ( */}
        <View style={styles.propertyContainer}>
          <Text style={styles.propertyName}>Title:</Text>
          <Text style={styles.propertyValue}>{product.title}</Text>
        </View>
        <View style={styles.propertyContainer}>
          <Text style={styles.propertyName}>Price:</Text>
          <Text style={styles.propertyValue}>₹ {product.price}</Text>
        </View>
        <View style={styles.propertyContainer}>
          <Text style={styles.propertyName}>Brand:</Text>
          <Text style={styles.propertyValue}>{brandName}</Text>
        </View>
        <View style={styles.propertyContainer}>
          <Text style={styles.propertyName}>Category:</Text>
          <Text style={styles.propertyValue}>{categoryName}</Text>
        </View>
        {/* ))} */}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  details: {
    flex: 1,
  },
  propertyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%', // Adjust width as needed
  },
  propertyValue: {
    fontSize: 16,
    color: '#555',
    width: '60%', // Adjust width as needed
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default ShowProduct;
