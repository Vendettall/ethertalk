import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants'
import { removeNotification } from '../actions'

export default function notifications(state = {}, action) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      setTimeout (() => 
        action.asyncDispatch(removeNotification(action.id))
      , 5000)

      return {
        ...state,
        [action.id]: {
          id: action.id,
          text: action.text
        }
      }
    }
    case REMOVE_NOTIFICATION: {
      let newState = { ...state }
      delete newState[action.id]
      
      return newState
    }
    default:
      return state
  }
}