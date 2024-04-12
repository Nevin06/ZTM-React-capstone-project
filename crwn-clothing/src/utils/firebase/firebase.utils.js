import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCynnmn17kcDnHHyzClJnVsIwnMHolfODg",
    authDomain: "crwn-clothing-db-a7d1b.firebaseapp.com",
    projectId: "crwn-clothing-db-a7d1b",
    storageBucket: "crwn-clothing-db-a7d1b.appspot.com",
    messagingSenderId: "552335607389",
    appId: "1:552335607389:web:b5ce26b4e5c30d51f02fb4"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth(firebaseApp);
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
  };

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
  };

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;
    
    const userDocRef = await doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // if user data doesn't exist
    // create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        })
      } catch (error){
        console.log('error creating the user', error.message);
      }
    }

    // if user data exist

    // return userDocRef
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);