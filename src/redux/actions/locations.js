import cuid from 'cuid';
import { toastr } from 'react-redux-toastr'
import { FETCH_LOCATIONS, DELETE_LOCATION } from '../constants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async';


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

//import moment from 'moment';
export const updateLocationProfile = location => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const { isLoaded, isEmpty, ...updatedLocation } = location;
  // if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
  //   updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  // }

  try {
    await firestore.updateProfile(updatedLocation);
    toastr.success('Success', 'Profile updated');
  } catch (error) {
    console.log(error);
  }
};

export const uploadLocationProfileImage = (file) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const locationId = getState().firestore.ordered.locations[0].id;
  const path = `${locationId}/location`;
  const options = {
    name: imageName
  };
  try {
        dispatch(asyncActionStart())
    // upload the file to fb storage
    
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    console.log(file);
    
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    // // get the userdoc from firestore
    let locationDoc = await firestore.get(`locations/${locationId}`);
    // check if user has photo, if not update profile
    console.log(locationDoc);
    
    if (!locationDoc.data().locationPhotoURL) {
      await firebase.updateProfile({
        locationPhotoURL: downloadURL
      });
      await firestore.updateProfile({
        locationPhotoURL: downloadURL
      });
    }
    //add the new photo to photos collection
    await firestore.add({
      collection: 'locations',
      doc: locationId,
      subcollections: [{collection: 'photos'}]
    }, {
      name: imageName,
      url: downloadURL
    })
    dispatch(asyncActionFinish())
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError())
    throw new Error('Problem uploading photo')
  }
};

export const deletePhoto = (photo) => 
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos', doc: photo.id}]
      })
    } catch (error) {
      console.log(error);
      throw new Error('Problem deleting the photo')
    }
  }

export const setMainPhoto = photo =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
      return await firebase.updateProfile({
        photoURL: photo.url
      })
    } catch (error) {
      console.log(error);
      throw new Error('Problem setting main photo')
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