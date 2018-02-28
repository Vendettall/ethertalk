import { SET_API, SET_SOCKET } from '../constants'
import { getAccounts, addNotification } from '../actions'

const initialState = {
  api: null,
  socket: null
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case SET_API:  {
      if (action.api) {
        action.asyncDispatch(getAccounts(action.api))
        return { ...state, api: action.api }
      }
      let errorText = addNotification
      action.asyncDispatch(addNotification(errorText))
      console.log(errorText)
      return state
    }
    case SET_SOCKET: {
      let prevSocket = state.socket
      if (prevSocket)
        prevSocket.stop()
      return { ...state, socket: action.socket }
    }
    default:
      return state
  }
}