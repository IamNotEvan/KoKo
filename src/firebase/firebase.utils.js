import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyAVrk0q3e_iyMeLJrs9WcnqflVw6V7esb8",
  authDomain: "aslingo-d0985.firebaseapp.com",
  projectId: "aslingo-d0985",
  storageBucket: "aslingo-d0985.appspot.com",
  messagingSenderId: "1082340229338",
  appId: "1:1082340229338:web:3b98dfc348a5fdcf6b65e3",
  measurementId: "G-C15L4MFG25"
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.email}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        stars: {},
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey, 
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit()
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => auth.signInWithPopup(provider).catch(()=>{});

export default firebase;