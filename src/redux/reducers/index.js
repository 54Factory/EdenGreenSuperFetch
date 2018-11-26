import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
import sessionReducer from './session';
import userReducer from './user';
import asyncReducer from './async';
import expenseReducer from '../../components/Playground/expenseReducer'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  sessionState: sessionReducer,
  userState: userReducer,
  asyncState: asyncReducer,
  form: FormReducer,
  toastr: toastrReducer,
  expenseState: expenseReducer
});

export default rootReducer;
