import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useRoute, useNavigation} from '@react-navigation/native';

function EditProduct() {
  const route = useRoute();
  const navigation = useNavigation();
  const {product} = route.params;
  const [editedTitle, setEditedTitle] = useState(product.title);
  const [editedPrice, setEditedPrice] = useState(product.price);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the title or price has been modified
    setIsModified(
      editedTitle !== product.title ||
        String(editedPrice) !== String(product.price),
    );
  }, [editedTitle, editedPrice]);

  const handleSubmit = () => {
    setLoading(true);
    // Create an updated product object with the edited details
    const updatedProduct = {
      ...product,
      title: editedTitle,
      price: editedPrice,
      // Add other fields as needed
    };

    // Call the handleUpdate function passed from ShowProduct
    handleUpdate(updatedProduct);
  };
  const handleUpdate = async updatedProduct => {
    try {
      // Update the Firestore document with the new product details
      await firestore().collection('Product').doc(updatedProduct.key).update({
        title: updatedProduct.title,
        price: updatedProduct.price,
        // Update other fields as needed
      });
      setLoading(false);

      navigation.navigate('Product', {product: updatedProduct});
      // Close the edit modal or navigate back to the product details screen
      // You can use React Navigation to go back or close the modal
    } catch (error) {
      setLoading(false);
      console.error('Error updating product:', error);
      // Handle error
    }
  };

  return (
    <View style={styles.editContainer}>
      <Text style={styles.editTitle}>Edit Product</Text>

      <Text style={styles.label}>Title:</Text>
      <TextInput
        value={editedTitle}
        onChangeText={setEditedTitle}
        placeholder="Enter title"
        style={styles.input}
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        value={editedPrice?.toString()}
        onChangeText={text => setEditedPrice(parseFloat(text))}
        placeholder="Enter price"
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Add additional input fields for other product details */}

      {/* Styled Update Button */}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          style={[
            styles.updateButton,
            isModified ? null : styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!isModified}>
          <Text style={styles.updateButtonText}>Update Product</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  editContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 8,
  },
  updateButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7', // Use a different color for the disabled state
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProduct;
