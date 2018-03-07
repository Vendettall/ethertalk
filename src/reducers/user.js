import { FETCH_USER_SUCCESS, REGISTER_USER_SUCCESS } from '../constants'


const initialState = {
  id: null,
  name: '',
  avatar: null,
  apiUser: null,
  walletId: null
}

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_USER_SUCCESS:
      return payload.user
    case REGISTER_USER_SUCCESS: {
      return {
        id: payload.apiUser.id,
        name: payload.name, 
        avatar: payload.avatar,
        apiUser: payload.apiUser,
        walletId: payload.walletId
      }
    }
    default:
      return state
  }
}