import { SEND_MESSAGE, GET_MESSAGE, UPDATE_MESSAGE_TEXT } from '../constants'
import Storage from '../utils/storage'
import formatDate from '../utils/formatDate'

export const sendMessage = async (socket, apiInterlocutor, text) => {
  let message = {
    text: text,
    isMy: true,
    date: formatDate(new Date())
  }
  let response = socket.sendMessage(apiInterlocutor, text).then(result => {return result})
  let messages = Storage.get(apiInterlocutor.id) || []
  Storage.set(apiInterlocutor.id, [...messages, message])
  return {
    type: SEND_MESSAGE,
    message,
    response
  }
}

export const getMessage = (apiMessage, pubKeys, currentInterlocutorId) => {
  let interlocutorId = pubKeys[apiMessage.from].id
  let isCurrentInterlocutor = false
  let message = {
    text: apiMessage.message,
    isMy: false,
    date: formatDate(apiMessage.sent)
  }
  let messages = Storage.get(interlocutorId) || []
  Storage.set(interlocutorId, [...messages, message])
  if (currentInterlocutorId && currentInterlocutorId === interlocutorId)
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