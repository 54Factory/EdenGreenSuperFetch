import { db, firestore } from './firebase';

// User API

export const doCreateUser = (id, firstName, lastName, username, email) =>
  db.ref(`users/${id}`).set({
    firstName,
    lastName,
    username,
    email,
  });
export const updateFirebaseUserProfile = (authUser, id, firstName, lastName, username, email) => {
let user = authUser.user;
user.updateProfile({
  displayName: username,
  photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
})
}
export const doCreateFirestoreUser = (id, firstName, lastName, username, email) => {
firestore.collection("users")
  .add({
    firstName, lastName, username, email
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
 
}




export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
