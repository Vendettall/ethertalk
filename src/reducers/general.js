import { SET_API, SET_SOCKET } from '../constants'
import { getAccounts, addNotification } from '../actions'

const initialState = {
  api: null,
  socket: null
}

export default function general(state = initialState, {type, payload}) {
  switch (type) {
    case SET_API:  {
      if (payload.api) {
        payload.asyncDispatch(getAccounts(payload.api))
        return { ...state, api: payload.api }
      }
      
      let errorText = addNotification
      payload.asyncDispatch(addNotification(errorText))
      console.log(errorText)

      return state
    }
    case SET_SOCKET: {
      let prevSocket = state.socket

      if (prevSocket)
        prevSocket.stop()

      return { ...state, socket: payload.socket }
    }
    default:
      return state
  }
}