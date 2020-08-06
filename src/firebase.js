import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBdFz3DzH5YpbEREauRXYdNN8d1rHGDhVs",
  authDomain: "fb-messenger-clone-b09e0.firebaseapp.com",
  databaseURL: "https://fb-messenger-clone-b09e0.firebaseio.com",
  projectId: "fb-messenger-clone-b09e0",
  storageBucket: "fb-messenger-clone-b09e0.appspot.com",
  messagingSenderId: "601038754747",
  appId: "1:601038754747:web:5fcee96a8bedd34fa6ea9e",
  measurementId: "G-D3H20KCH8M",
});

const db = firebase.firestore();

export default db;
