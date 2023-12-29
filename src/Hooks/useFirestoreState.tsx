import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

function useFirestoreState(collection) {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return [datas, loading];
}

export default useFirestoreState;
