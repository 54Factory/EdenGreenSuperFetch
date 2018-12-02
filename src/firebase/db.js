import { toastr } from 'react-redux-toastr';
import { db, firestore, storage } from './firebase';

// User API
// Firebase - Create User
export const doCreateUser = (id, firstName, lastName, username, email, role) =>
  db.ref(`users/${id}`).set({
    firstName,
    lastName,
    username,
    email, 
    role
  });
// Update Auth Profile
export const updateFirebaseUserProfile = (authUser, id, firstName, lastName, username, email, role) => {
let user = authUser.user;
user.updateProfile({
  displayName: username,
  photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
})
}
// Firestore - Create User
export const doCreateFirestoreUser = (authUser, firstName, lastName, username, email, role) => {
firestore.collection('users').doc(`${authUser.user.uid}`)
  .set({
    firstName, lastName, username, email, role
})
.then(function() {
  toastr.success('Success', 'User has been created');
    console.log("Document written with ID: ", authUser.user.uid );
})
.catch(function(error) {
    console.error("Error adding document: ", error);
    toastr.error('Success', 'Event has been created');
});
}

// Get Users from Firebase...ALERT NOT FIRESTORE!
export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...

export const createCustomer = (firstName, lastName, phone, email) => {
  const newCustomer = {firstName, lastName, phone, email}
  firestore.collection('customers').add({
    firstName,
    lastName,
    phone,
    email,
    created: Date.now()
  })
  .then(res => {
    db.ref(`customers/${res.id}`).set({
      ...newCustomer
    });
    console.log("Documents written with ID: ", res.id );
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

}