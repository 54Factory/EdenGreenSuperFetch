import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import { createNewLocation } from '../../components/Create/dataHelpers/helpers';

export const createNewAccount = location => {
  return async (dispatch, getState, { getFirestore }) => {
    const ownedById = cuid();
    const firestore = getFirestore();
    let newLocation= createNewLocation(ownedById, location)
    try {
      let createdLocation = await firestore.add(`locations`, newLocation);
      await firestore.set(`customer/${createdLocation.id}_${ownedById}`, {
        displayName: location.username,
        firstname: location.firstName,
        lastName: location.lastName,  
        ownedLocations: {
          [createdLocation.id]: {
            locationName: location.locationName,
            photoURL: 'assets/userPhoto.jpg',
          }
        },
      });
      console.log('Success', 'Expense has been created');
      console.log(createdLocation);
      
      toastr.success('Success', 'Event has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  }
}
