// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc 
  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJcYKWwpl4Dt_j1q7RjQuCFfEiYGtdXAc",
  authDomain: "crwn-clothing-db-71748.firebaseapp.com",
  projectId: "crwn-clothing-db-71748",
  storageBucket: "crwn-clothing-db-71748.appspot.com",
  messagingSenderId: "768327822906",
  appId: "1:768327822906:web:9d321d17e994872ca00f03"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters( {
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const  createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc (db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){ // user exists
    const {displayName, email} = userAuth;
    const createdAt = new Date()
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }catch(error){
      console.log('error creating the user ' + error.message);
    }
  }
  return userDocRef;
  // check if user date exists
  
  //if user data DOESN'T exists
  
  // return userDocRef

};
