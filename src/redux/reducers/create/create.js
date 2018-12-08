// Create Reducers
const initialState = [];


export const createNewAccount = (state, payload) => {
  return [...state, Object.assign({}, payload.location)]
}

export const updateLocation = (state, payload) => {
  return [
    ...state.filter(location => location.id !== payload.location.id),
    Object.assign({}, payload.location)
  ]
}

export const deleteLocation = (state, payload) => {
  return [
    ...state.filter(location => location.id !== payload.locationId)
  ]
}

export const fetchLocations = (state, payload) => {
  return payload.locations
}
function createReducer(state = initialState, action) {
  switch(action.type) {
    case 'CREATE_NEW_ACCOUNT' : {
      return createNewAccount(state, action);
    }
    case 'DELETE_LOCATION' : {
      return deleteLocation(state, action);
    }
    case 'UPDATE_LOCATION' : {
      return updateLocation(state, action);
    }
    default : return state;
  }
}

export default createReducer;