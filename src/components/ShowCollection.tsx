import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Card, Button, Dialog} from '@rneui/themed';
import AddCollection from './AddCollection';

function Brands({collection}) {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection(collection)
      .onSnapshot(querySnapshot => {
        const data = [];

        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setDatas(data);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
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
    </View>
  );

  const toggleDialog = () => {
    setVisible(!visible);
  };

  if (loading) {
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
        onPress={toggleDialog}
      />
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title={`Add ${collection}`} />
        <AddCollection collection={collection} closeDialog={toggleDialog} />
      </Dialog>
      <FlatList
        data={datas}
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

export default Brands;
