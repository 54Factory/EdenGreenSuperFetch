import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../async';
import { FETCH_SETUPS } from '../../../constants'
import firebase from 'firebase'

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