import { toastr } from 'react-redux-toastr';
import cuid from 'cuid'
export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
  }
}

export const createDataTree = dataset => {
  let hashTable = Object.create(null);
  dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
  let dataTree = [];
  dataset.forEach(a => {
      if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
      else dataTree.push(hashTable[a.id])
  });
  return dataTree
};

// DATABASE - MODELLING SHAPE OF DATA
// CREATE NEW CUSTOMER

export const createNewLocation = (ownedById, photoURL, location) => {

  return {
    ...location,
    ownershipProfileId: ownedById,
    locationPhotoURL: "assets/pizza_pyramids_1250235.jpg",
    hostPhotoURL: photoURL || '/assets/user.png',
    created: Date.now(),
    ownedBy: {
      [ownedById]: {
        displayName: "Seth Mantooth",
        photoURL: photoURL || 'assets/userPhoto.jpg'
      }
    }
  }
}

export const createNewAccount = location => {
  return async (dispatch, getState, { getFirestore }) => {
    const ownedById = cuid();
    const firestore = getFirestore();
    //const user = getState().firebase.auth;
    let newLocation= createNewLocation(ownedById, location)
    try {
      let createdLocation = await firestore.add(`locations`, newLocation);
      await firestore.set(`customer/${createdLocation.id}_${ownedById}`, {
        locationName: location.locationName,
        ownedLocationId: createdLocation.id,
      });
      console.log('Success', 'Expense has been created');
      console.log(createdLocation);
      
      toastr.success('Success', 'Event has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  }
}
