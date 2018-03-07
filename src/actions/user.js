import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from '../constants'

export const fetchUserRequest = (api, account) => {
  return {
    type: FETCH_USER_REQUEST,
    payload: ({ api, account })
  }
}

export const fetchUserSuccess = user => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: ({ user })
  }
}

export const fetchUserError = error => {
  return {
    type: FETCH_USER_ERROR,
    payload: new Error(error),
    error: true
  }
}