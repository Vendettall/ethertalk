import { SEND_MESSAGE, GET_MESSAGE, UPDATE_MESSAGE_TEXT } from '../constants'
import Storage from '../utils/storage'
import formatDate from '../utils/formatDate'

export const sendMessage = async (socket, apiInterlocutor, text) => {
  let message = { // convert to stateMessage
    text: text,
    isMy: true,
    date: formatDate(new Date())
  }

  let response = socket.sendMessage(apiInterlocutor, text) // send message by socket
    .then(result => {return result})
  
  let messages = Storage.get(apiInterlocutor.id) || []
  Storage.set(apiInterlocutor.id, [...messages, message]) // add message to storage

  return {
    type: SEND_MESSAGE,
    message,
    response
  }
}

export const getMessage = (apiMessage, pubKeys, currentInterlocutorId) => {
  let interlocutorId = pubKeys[apiMessage.from].id
  let isCurrentInterlocutor = false

  let message = { // convert to stateMessage
    text: apiMessage.message,
    isMy: false,
    date: formatDate(apiMessage.sent)
  }

  let messages = Storage.get(interlocutorId) || []
  Storage.set(interlocutorId, [...messages, message]) // add message to storage

  if (currentInterlocutorId && currentInterlocutorId === interlocutorId) // check if we are chatting with sender
    isCurrentInterlocutor = true
  
  return {
    type: GET_MESSAGE,
    message, 
    isCurrentInterlocutor
  }
}
export const updateMessageText = text => {
  return {
    type: UPDATE_MESSAGE_TEXT,
    text
  }
}