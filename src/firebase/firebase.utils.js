import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD_LgzBEw9JSRubLHshLttPlCwLFdmUjY8",
  authDomain: "crwn-db-23727.firebaseapp.com",
  databaseURL: "https://crwn-db-23727.firebaseio.com",
  projectId: "crwn-db-23727",
  storageBucket: "crwn-db-23727.appspot.com",
  messagingSenderId: "690248600492",
  appId: "1:690248600492:web:b5bde9d1f5e86863ed0809"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('Error creating user', err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;