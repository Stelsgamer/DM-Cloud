const SET_LOADER = 'SET_LOADER'



const defaultState = {
    loader: true
}

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LOADER: return {...state, loader: action.payload}


    default:
      return state;
  }
}

export const setLoader = () => ({type: SET_LOADER})



