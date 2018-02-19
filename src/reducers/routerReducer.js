/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const initialState = {
  locationBeforeTransitions: null
}

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
export default function routerReducer(state = initialState, action) {
  // console.log(action)
  switch(action.type) {
    case LOCATION_CHANGE:
      return { ...state, locationBeforeTransitions: action.payload }
    case 'REGISTER_CURRENT_USER': {
      if(action.response) {
        return { ...state, locationBeforeTransitions: { 
          hash: '',
          key: '', 
          pathname: '/',
          search: '',
          state: undefined
        }}
      }
      return state
    }
    default: 
      return state
    }
}