import { db } from './firebase';

// User API

export const doCreateUser = (id, firstName, lastName, username, email) =>
  db.ref(`users/${id}`).set({
    firstName,
    lastName,
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
