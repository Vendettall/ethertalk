import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants'

let id = 0 

export const addNotification = text => {
  id++
  return {
    type: ADD_NOTIFICATION,
    payload: ({ id, text })
  }
}

export const removeNotification = id => {
  return {
    type: REMOVE_NOTIFICATION,
    payload: ({ id })
  }
}