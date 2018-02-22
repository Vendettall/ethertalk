import { UPDATE_REGISTRATION_NAME, UPDATE_REGISTRATION_AVATAR } from '../constants'

const initialState = {
  name: '',
  avatar: null
}

export default function registerUser(state = initialState, action) {
  switch (action.type) {
    case UPDATE_REGISTRATION_NAME: 
      return { ...state, name: action.name }
    case UPDATE_REGISTRATION_AVATAR:
      return { ...state, avatar: action.avatar }
    default:
      return state
  }
}