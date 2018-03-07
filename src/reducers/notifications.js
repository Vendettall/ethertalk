import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants'


export default function notifications(state = {}, { type, payload }) {
  switch (type) {
    case ADD_NOTIFICATION: {
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          text: payload.text
        }
      }
    }
    case REMOVE_NOTIFICATION: {
      let newState = { ...state }
      delete newState[payload.id]
      
      return newState
    }
    default:
      return state
  }
}