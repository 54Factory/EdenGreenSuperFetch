import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import { createNewLocation } from '../../../crud/dataHelpers/helpers';
import moment from 'moment';

const ownedById = cuid();
const oilCollectionServiceId = cuid()
const oilCollectionSetupServiceId = cuid()

export const createNewAccount = location => {
  let newSetUpDate = moment(location.oilCollectionSetUpDate).toDate()
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let newLocation= createNewLocation(ownedById, oilCollectionServiceId, oilCollectionSetupServiceId, location)

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
            photoURL: 'assets/user.png',
          }
        },
      });
      await firestore.set(`oilCollection/${createdLocation.id}_${oilCollectionServiceId}`, {
        locationName: location.locationName,
        locationId: createdLocation.id,
        collectionCycle: location.oilCollectionCycle,
        isSetUp: false
      });
      await firestore.set(`oilCollectionSetup/${createdLocation.id}_${oilCollectionSetupServiceId}`, {
        oilCollectionSetUpDate: newSetUpDate,
        oilCollectionContainerType: location.oilCollectionContainerType,
        oilCollectionContainerQuantity: location.oilCollectionContainerQuantity,
        locationName: location.locationName,
        locationId: createdLocation.id,
        oilCollectionServiceId,
        isComplete: false
      });
      console.log('Success', 'New Account has been created');
      console.log(createdLocation);
      
      toastr.success('Success', 'New Account has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  }
}
