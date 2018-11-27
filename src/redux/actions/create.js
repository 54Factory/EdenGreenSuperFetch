import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import { createNewLocation } from '../../components/Create/dataHelpers/helpers';

const ownedById = cuid();
export const createNewAccount = location => {
  return async (dispatch, getState, { getFirestore }) => {
    
    const firestore = getFirestore();
    let newLocation= createNewLocation(ownedById, location)
    try {
      let createdLocation = await firestore.add(`locations`, newLocation);
      console.log(location);
      await firestore.set(`customer/${createdLocation.id}_${ownedById}`, {
        displayName: `${location.firstName} ${location.lastName}`,
        firstname: location.firstName,
        lastName: location.lastName,  
        ownedLocations: {
          [createdLocation.id]: {
            locationName: location.locationName,
            photoURL: 'assets/userPhoto.jpg',
          }
        },
      });
      console.log('Success', 'New Account has been created');
      console.log(createdLocation);
      
      toastr.success('Success', 'New Account has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  }
}
