import { UPDATE_REGISTRATION_NAME, UPDATE_REGISTRATION_AVATAR } from '../constants'

export const updateRegistrationName = name => {
  return {
    type: UPDATE_REGISTRATION_NAME,
    name
  }
}

export const updateRegistrationAvatar = avatar => {
  return {
    type: UPDATE_REGISTRATION_AVATAR,
    avatar
  }
}