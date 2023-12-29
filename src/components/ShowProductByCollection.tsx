import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

function ShowProductByCollection() {
  const navigation = useNavigation();
  const route = useRoute();
  const {item, collection} = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByBrand = async () => {
      try {
        // Perform a query to get products with the specified brand
        const querySnapshot = await firestore()
          .collection('Product')
          .where(`${collection.toLowerCase()}Id`, '==', item.key)
          .get();

        // Extract data from the query snapshot
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set the products state
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByBrand();
  }, [collection]);

  const handleEdit = () => {
    // Implement your edit logic here
    Alert.alert(
      `Edit ${item.title}`,
      'Edit functionality will be implemented here.',
    );
  };

  const handleDelete = () => {
    // Implement your delete logic here
    Alert.alert(
      `Delete ${item.title}`,
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
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Product', {product: item})}>
      <View style={styles.productContainer}>
        <Image source={{uri: item.imageURL}} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
        <Image source={{uri: item.imageURL}} style={styles.brandImage} />
        <View style={styles.brandDetails}>
          <Text style={styles.brandName}>{item.title}</Text>
          {/* Add other brand details as needed */}
        </View>
      </View>
      {!products.length ? (
        <Text style={styles.noProductText}>No Product Found</Text>
      ) : (
        <Text style={styles.noProductText}>Products</Text>
      )}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  brandImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25, // Half of the width and height for a circular image
  },
  brandDetails: {
    flex: 1,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noProductText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ShowProductByCollection;
