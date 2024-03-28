import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCynnmn17kcDnHHyzClJnVsIwnMHolfODg",
    authDomain: "crwn-clothing-db-a7d1b.firebaseapp.com",
    projectId: "crwn-clothing-db-a7d1b",
    storageBucket: "crwn-clothing-db-a7d1b.appspot.com",
    messagingSenderId: "552335607389",
    appId: "1:552335607389:web:b5ce26b4e5c30d51f02fb4"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth(firebaseApp);
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);  