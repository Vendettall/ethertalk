import { SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR,
  GET_API_MESSAGE, GET_MESSAGE, UPDATE_MESSAGE_TEXT } from '../constants'

export const sendMessageRequest = (socket, apiInterlocutor, text) => {
  return {
    type: SEND_MESSAGE_REQUEST,
    payload: ({ socket, apiInterlocutor, text })
  }
}

export const sendMessageSuccess = message => {
  return {
    type: SEND_MESSAGE_SUCCESS,
    payload: ({ message })
  }
}

export const sendMessageError = error => {
  return {
    type: SEND_MESSAGE_ERROR,
    payload: new Error(error),
    error: true
  }
}

export const getApiMessage = apiMessage => {
  console.log(apiMessage, 'API_MESSAGE')
  return {
    type: GET_API_MESSAGE,
    payload: ({ apiMessage })
  }
}

export const getMessage = (message, isCurrentInterlocutor) => {
  return {
    type: GET_MESSAGE,
    payload: ({ message, isCurrentInterlocutor })
  }
}

export const updateMessageText = text => {
  return {
    type: UPDATE_MESSAGE_TEXT,
    payload: ({ text })
  }
}