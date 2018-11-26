
const initialState = [];

export const createEvent = (state, payload) => {
  return [...state, Object.assign({}, payload.event)]
}
export const createExpense = (state, payload) => {
  return [...state, Object.assign({}, payload.event)]
}

export const updateEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.event.id),
    Object.assign({}, payload.event)
  ]
}

export const deleteEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.eventId)
  ]
}


export const fetchEvents = (state, payload) => {
  return payload.events
}
function eventReducer(state = initialState, action) {
  switch(action.type) {
    case 'CREATE_EVENT' : {
      return createEvent(state, action);
    }
    case 'CREATE_EXPENSE' : {
      return createEvent(state, action);
    }
    case 'DELETE_EVENT' : {
      return deleteEvent(state, action);
    }
    case 'UPDATE_EVENT' : {
      return updateEvent(state, action);
    }
    default : return state;
  }
}

export default eventReducer;