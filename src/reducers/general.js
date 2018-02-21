import { SET_API, SET_SOCKET } from '../constants'
import { getAccounts } from '../actions'

const initialState = {
  api: null,
  socket: null
}

export default function general(state = initialState, action) {
  switch (action.type) {
    case SET_API:  {
      if (action.api) {
        action.asyncDispatch(getAccounts(action.api))
        return Object.assign({}, state, {api: action.api})
      } else {
        return state
      }
    }
    case SET_SOCKET:
      let prevSocket = state.socket
      if (prevSocket)
        prevSocket.stop()
      return Object.assign({}, state, {socket: action.socket})
    default:
      return state
  }
}