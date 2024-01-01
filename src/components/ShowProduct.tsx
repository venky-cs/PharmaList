import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

function ShowProduct() {
  const [brandName, setBrandName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const {product} = route.params;

  const handleEdit = () => {
    navigation.navigate('EditProduct', {product: product});
  };

  const handleDelete = () => {
    // Show a confirmation modal before deleting the product
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      // Delete the product from Firestore
      await firestore()
        .collection('Product')
        .doc(product?.key || product?.id)
        .delete();

      // Close the modal
      setIsDeleteModalVisible(false);

      // Navigate back to the previous screen or update the UI as needed
      // navigation.goBack();
      navigation.navigate('Products');
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error
    }
  };

  const cancelDelete = () => {
    // Close the confirmation modal
    setIsDeleteModalVisible(false);
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
      {/* Delete Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setIsDeleteModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Confirm Deletion</Text>
            <Text>Are you sure you want to delete this product?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.button} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={cancelDelete}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    color: 'black',
    width: '40%', // Adjust width as needed
  },
  propertyValue: {
    fontSize: 16,
    color: 'black',
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
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ShowProduct;
