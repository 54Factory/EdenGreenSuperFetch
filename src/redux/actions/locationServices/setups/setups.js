import firebase from 'firebase'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../async';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

import { FETCH_SETUPS } from '../../../constants'


export const getOilCollectionSetUps = () => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  // const today = new Date(Date.now());
  
  let query = firestore.collection('oilCollectionSetup').orderBy('oilCollectionSetUpDate', 'desc');
  try {
    let querySnap = await query.get();
    let setups = [];

    for (let i=0; i<querySnap.docs.length; i++) {
      let stp = await firestore.collection('oilCollectionSetup').doc(querySnap.docs[i].data().oilCollectionServiceId).get();
      setups.push({...stp.data(), id: stp.id})
    }

    dispatch({type: FETCH_SETUPS, payload: {setups}})
    
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const updateSetup = oilCollectionSetup => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    // if (oilCollectionSetup.oilCollectionSetupDate !== getState().firestore.ordered.oilCollectionSetups[0].oilCollectionSetupDate) {
    //   oilCollectionSetup.oilCollectionSetupDate = moment(oilCollectionSetup.oilCollectionSetupDate).toDate();
    // }
    try {
      await firestore.update(`oilCollectionSetup/${oilCollectionSetup.id}`, {
        isComplete: true,
        oilCollectionContainerType: oilCollectionSetup.oilCollectionContainerType,
        oilCollectionContainerQuantity: oilCollectionSetup.oilCollectionContainerQuantity,
        oilCollectionSetUpCompletedDate: Date.now()
      })
      await firestore.update(`oilCollection/${oilCollectionSetup.locationId}_${oilCollectionSetup.oilCollectionServiceId}`, {
        isSetUp: true
      })
      await firestore.update(`locations/${oilCollectionSetup.locationId}`, {
        oilCollectionSetUp: true,
        oilCollectionContainerType: oilCollectionSetup.oilCollectionContainerType,
        oilCollectionContainerQuantity: oilCollectionSetup.oilCollectionContainerQuantity,
        oilCollectionSetUpCompletedDate: Date.now()
      })
      toastr.success('Success', 'Set Up has been updated');
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong');
    }
  };
};