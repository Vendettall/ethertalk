import { UPDATE_REGISTRATION_NAME, UPDATE_REGISTRATION_AVATAR } from '../constants'

const initialState = {
  name: '',
  avatar: null
}

export default function registerUser(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_REGISTRATION_NAME: 
      return { ...state, name: payload.name }
    case UPDATE_REGISTRATION_AVATAR:
      return { ...state, avatar: payload.avatar }
    default:
      return state
  }
}