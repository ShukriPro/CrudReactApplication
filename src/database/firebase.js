import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDLcXYZ6NOqpD8NAh3kDI5XDcRWjLa1w9Q",
  authDomain: "crud-react-1ddc2.firebaseapp.com",
  projectId: "crud-react-1ddc2",
  storageBucket: "crud-react-1ddc2.appspot.com",
  messagingSenderId: "814678335481",
  appId: "1:814678335481:web:2fa51a0e3d221fb7466728",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc };