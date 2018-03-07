import { FETCH_API_SUCCESS, SET_SOCKET_SUCCESS } from '../constants'


const initialState = {
  api: null,
  socket: null
}

export default function general(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_API_SUCCESS:
      return { ...state, api: payload.api }
    case SET_SOCKET_SUCCESS: 
      return { ...state, socket: payload.socket }
    default:
      return state
  }
}