import { UPDATE_REGISTRATION_NAME, UPDATE_REGISTRATION_AVATAR,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from '../constants'


export const updateRegistrationName = name => {
  return {
    type: UPDATE_REGISTRATION_NAME,
    payload: ({ name })
  }
}

export const updateRegistrationAvatar = avatar => {
  return {
    type: UPDATE_REGISTRATION_AVATAR,
    payload: ({ avatar })
  }
}

export const registerUserRequest = (api, account, name, avatarAsFile) => {
  return {
    type: REGISTER_USER_REQUEST,
    payload: ({ api, account, name, avatarAsFile })
  }
}

export const registerUserSuccess = (apiUser, name, avatar, walletId) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: ({ apiUser, name, avatar, walletId })
  }
}

export const registerUserError = error => {
  return {
    type: REGISTER_USER_ERROR,
    payload: new Error(error),
    error: true
  }
}