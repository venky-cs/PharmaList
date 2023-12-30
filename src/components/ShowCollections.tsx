import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card, Button} from '@rneui/themed';
import useFirestoreState from '../Hooks/useFirestoreState';
import {useNavigation} from '@react-navigation/native';

function ShowCollections({collection}) {
  const [collectionData, collectionDataLoading] = useFirestoreState(collection);
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(collection, {item: item, collection: collection})
        }>
        <Card containerStyle={styles.innerCard}>
          <Card.Image
            style={styles.cardImage}
            resizeMode="cover"
            source={{
              uri: item.imageURL,
            }}
          />
          <Text style={{textAlign: 'center'}}>{item.title}</Text>
        </Card>
      </TouchableOpacity>
    </View>
  );

  const createCollection = () => {
    navigation.navigate(`Add${collection}`, {collection: collection});
  };

  if (collectionDataLoading) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <Button
        title={`Add ${collection}`}
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
        onPress={createCollection}
      />
      <FlatList
        data={collectionData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.scrollViewContainer}
        ListFooterComponent={<View style={{height: 70}} />}
      />
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
});

export default ShowCollections;
