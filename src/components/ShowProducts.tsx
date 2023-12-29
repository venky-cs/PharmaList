import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card, Button, Dialog} from '@rneui/themed';
import useFirestoreState from '../Hooks/useFirestoreState';
import {useNavigation} from '@react-navigation/native';

function ShowProducts() {
  const [productCollection, productCollectionLoading] =
    useFirestoreState('Product');
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Product', {product: item})}>
        <Card containerStyle={styles.innerCard}>
          <Card.Image
            style={styles.cardImage}
            resizeMode="cover"
            source={{
              uri: item.imageURL,
            }}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>₹ {item.price}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );

  if (productCollectionLoading) {
    return <ActivityIndicator />;
  }
  return (
    <>
      {productCollection && (
        <FlatList
          data={productCollection}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.scrollViewContainer}
          ListFooterComponent={<View style={{height: 70}} />}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 10,
  },
  card: {
    flex: 1,
    padding: 5,
  },
  innerCard: {
    flex: 1,
    borderRadius: 10, // Add border radius to the entire Card
    overflow: 'hidden', // Clip the content to the border radius
  },
  cardImage: {
    flex: 1,
    aspectRatio: 1,
    // Apply additional styles to the image as needed
  },
  cardInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShowProducts;
