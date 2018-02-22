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
        return { ...state, api: action.api }
      }
      console.log('Error. API wasn\'t set up.')
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