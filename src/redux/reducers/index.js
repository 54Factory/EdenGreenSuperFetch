import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
import sessionReducer from './session';
import userReducer from './user';
import asyncReducer from './async';
import createReducer from './create/create'
import locationsReducer from './locations'
import locationServicesReducer from './locationServices'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  sessionState: sessionReducer,
  userState: userReducer,
  async: asyncReducer,
  create: createReducer,
  locations: locationsReducer,
  locationServices: locationServicesReducer,
  form: FormReducer,
  toastr: toastrReducer,
});

export default rootReducer;
