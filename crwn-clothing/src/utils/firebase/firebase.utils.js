import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
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
          createdAt
        })
      } catch (error){
        console.log('error creating the user', error.message);
      }
    }

    // if user data exist

    // return userDocRef
    return userDocRef;
  };