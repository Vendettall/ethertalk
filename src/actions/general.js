import { FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_ERROR,
  SET_SOCKET_REQUEST, SET_SOCKET_SUCCESS } from '../constants'

export const fetchApiRequest = () => {
  return {
    type: FETCH_API_REQUEST
  }
}

export const fetchApiSuccess = api => {
  return { 
    type: FETCH_API_SUCCESS,
    payload: ({ api })
  }
}

export const fetchApiError = error => {
  return {
    type: FETCH_API_ERROR,
    payload: new Error(error),
    error: true
  }
}

export const setSocketRequest = apiUser => {
  return {
    type: SET_SOCKET_REQUEST,
    payload: ({ apiUser })
  }
}

export const setSocketSuccess = socket => {
  return {
    type: SET_SOCKET_SUCCESS,
    payload: ({ socket })
  }
}