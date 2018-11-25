
const initialState = {
  loading: false
}

export const asyncActionStarted = (state, payload) => {
  return {...state, loading: true}
}

export const asyncActionFinished = (state) => {
  return {...state, loading: false}
}

export const asyncActionError = (state) => {
  return {...state, loading: false}
}

function asyncReducer(state = initialState, action) {
  switch(action.type) {
    case 'ASYNC_ACTION_START' : {
      return asyncActionStarted(state, action);
    }
    case 'ASYNC_ACTION_FINISH' : {
      return asyncActionStarted(state, action);
    }
    case 'ASYNC_ACTION_ERROR' : {
      return asyncActionStarted(state, action);
    }
    default : return state;
  }
}

export default asyncReducer;