import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';

export const uploadImageToFirebase = async image => {
  const storageRef = storage().ref(`images/${image.fileName}`);
  console.log(storageRef);

  const imageUri = image.uri;
  const data = await RNFS.readFile(imageUri, 'base64');

  await storageRef.putString(data, 'base64', {contentType: 'image/jpeg'});

  const downloadURL = await storageRef.getDownloadURL();
  return downloadURL;
};

export const addDataToFirestore = async ({title, imageURL, collection}) => {
  await firestore().collection(collection).add({
    title,
    imageURL,
  });
};

export const addProductToFirestore = async ({
  title,
  imageURL,
  price,
  brandId,
  categoryId,
}) => {
  await firestore().collection('Product').add({
    title,
    imageURL,
    price,
    brandId,
    categoryId,
  });
};
