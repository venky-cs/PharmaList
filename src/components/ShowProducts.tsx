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
            <Text style={styles.cardTitle}>₹ {item.price}</Text>
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
          ListFooterComponent={<View style={styles.footer} />}
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
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2, // Add shadow for an elevated look
  },
  cardImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10, // Adjust border radius
  },
  cardInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  footer: {
    height: 70,
  },
});

export default ShowProducts;
