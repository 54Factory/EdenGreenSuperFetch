import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../async';
import firebase from 'firebase'

export const getUserEvents = (userUid, activeTab) => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  let eventsRef = firestore.collection('event_attendee');
  let query;
  switch (activeTab) {
    case 1: // past events
      query = eventsRef
        .where('userUid', '==', userUid)
        .where('eventDate', '<=', today)
        .orderBy('eventDate', 'desc');
      break;
    case 2: // future events
      query = eventsRef
        .where('userUid', '==', userUid)
        .where('eventDate', '>=', today)
        .orderBy('eventDate');
      break;
    case 3: // hosted events
      query = eventsRef
        .where('userUid', '==', userUid)
        .where('host', '==', true)
        .orderBy('eventDate', 'desc');
      break;
    default:
      query = eventsRef.where('userUid', '==', userUid).orderBy('eventDate', 'desc');
  }
  try {
    let querySnap = await query.get();
    let events = [];

    for (let i=0; i<querySnap.docs.length; i++) {
      let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
      events.push({...evt.data(), id: evt.id})
    }

    // dispatch({type: FETCH_EVENTS, payload: {events}})
    
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};