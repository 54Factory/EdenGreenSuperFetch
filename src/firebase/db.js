import { db, firestore } from './firebase';

// User API

export const doCreateUser = (id, firstName, lastName, username, email, role) =>
  db.ref(`users/${id}`).set({
    firstName,
    lastName,
    username,
    email, role,
  });
export const updateFirebaseUserProfile = (authUser, id, firstName, lastName, username, email, role) => {
let user = authUser.user;
user.updateProfile({
  displayName: username,
  photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
})
}
export const doCreateFirestoreUser = (authUser, firstName, lastName, username, email, role) => {
 
firestore.collection('users').doc(`${authUser.user.uid}`)
  .set({
    firstName, lastName, username, email, role
})
.then(function() {
    console.log("Document written with ID: ", authUser.user.uid );
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

 
}




export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
