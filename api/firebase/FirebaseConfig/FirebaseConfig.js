import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage  } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg-s9qsyOlHSkNYfGyYPk1Ce8_9NCdl4w",
  authDomain: "doclink-f8bef.firebaseapp.com",
  projectId: "doclink-f8bef",
  storageBucket: "doclink-f8bef.appspot.com",
  messagingSenderId: "349319504616",
  appId: "1:349319504616:web:fd2c71d06d67324a09df5d",
  measurementId: "G-JC2WD4Y4HZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});   
const db = getFirestore(app);
const  storage = getStorage(app)


export { app, auth, db, storage,  };

