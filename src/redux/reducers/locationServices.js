// Create Reducers
const initialState = [];

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

export const fetchSetups = (state, payload) => {
  return payload.locations
}
function locationServicesReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_SETUPS' : {
      return fetchSetups(state, action);
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

export default locationServicesReducer;