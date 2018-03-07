import { TOGGLE_FORM, UPDATE_SEARCH_TEXT, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS,
  SEARCH_USER_ERROR } from '../constants'


export const toggleForm = isOpened => {
  return {
    type: TOGGLE_FORM,
    payload: ({ isOpened })
  }
}

export const updateSearchText = text => {
  return {
    type: UPDATE_SEARCH_TEXT,
    payload: ({ text })
  }
}

export const searchUserRequest = text => {
  return {
    type: SEARCH_USER_REQUEST,
    payload: ({ text })
  }
}

export const searchUserSuccess = response => {
  return {
    type: SEARCH_USER_SUCCESS,
    payload: ({ response })
  }
}

export const searchUserError = error => {
  return {
    type: SEARCH_USER_ERROR,
    payload: new Error(error),
    error: true
  }
}