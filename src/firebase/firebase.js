import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


const prodConfig = {
    apiKey: "AIzaSyBZWvcf7KHmOWX5EfFqZWkhl9pJw2GtiKk",
    authDomain: "superfetch-d20fc.firebaseapp.com",
    databaseURL: "https://superfetch-d20fc.firebaseio.com",
    projectId: "superfetch-d20fc",
    storageBucket: "superfetch-d20fc.appspot.com",
    messagingSenderId: "491803962950"
 
};

const devConfig = {
    apiKey: "AIzaSyBZWvcf7KHmOWX5EfFqZWkhl9pJw2GtiKk",
    authDomain: "superfetch-d20fc.firebaseapp.com",
    databaseURL: "https://superfetch-d20fc.firebaseio.com",
    projectId: "superfetch-d20fc",
    storageBucket: "superfetch-d20fc.appspot.com",
    messagingSenderId: "491803962950"
 
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

export default firebase.initializeApp(config);


const db = firebase.database();
const auth = firebase.auth();
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

export {
  db,
  auth,
  firestore,
};
