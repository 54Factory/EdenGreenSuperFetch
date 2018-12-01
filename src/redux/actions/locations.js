//import { toastr } from 'react-redux-toastr'
import { FETCH_LOCATIONS, DELETE_LOCATION } from '../constants';
//import { asyncActionStart, asyncActionFinish, asyncActionError } from './async';


export const fetchLocations = locations => {
  return {
    type: FETCH_LOCATIONS,
    payload: locations
  };
};

export const deleteLocation = locationID => {
  return {
    type: DELETE_LOCATION,
    payload: {
      locationID
    }
  }
}



// export const getLocationsForDashboard = lastLocation => async (dispatch, getState, { getFirestore }) => {
//   //let today = new Date(Date.now());
//   const firestore = getFirestore();
//   const locationsRef = firestore.collection('locations');
//   try {
//     dispatch(asyncActionStart());
    
//     let startAfter =
//       lastLocation &&
//       (await firestore
//         .collection('locations')
//         .doc(lastLocation.id)
//         .get());
//     let query;

//     lastLocation
//       ? (query = locationsRef
//         // .where('date', '>=', today)
//         // .orderBy('dateCreated')
//         // .startAfter(startAfter)
//         .limit(2))
//       : (query = locationsRef
//         // .where('dateCreated', '>=', today)
//         .orderBy('dateCreated')
//         .limit(2));

//     let querySnap = await query.get();

//     if (querySnap.docs.length === 0) {
//       dispatch(asyncActionFinish());
//       //console.log('Query Snap------> ', querySnap);
//       return querySnap;
      
      
//     }
//     let locations = [];

//     for (let i = 0; i < querySnap.docs.length; i++) {
//       let loc = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };

//       locations.push(loc);
//     }
//     dispatch({ type: FETCH_LOCATIONS, payload: { locations } });
//     dispatch(asyncActionFinish());
//       return querySnap;
//   } catch (error) {
//     //console.log(error);
//     dispatch(asyncActionError());
//     toastr.error('Oops! Something did not work right.....')
//   }
// };