import Storage from '../utils/storage'
import formatDate from '../utils/formatDate'

export const sendMessage = async (socket, apiInterlocutor, text) => {
  let message = {
    text: text,
    isMy: true,
    date: formatDate(new Date())
  }
  let response = socket.sendMessage(apiInterlocutor, text).then(result => {return result})
  let messages = Storage.get(apiInterlocutor.id.toString()) || []
  Storage.set(apiInterlocutor.id.toString(), [...messages, message])
  return {
    type: 'SEND_MESSAGE',
    message,
    response
  }
}

export const getMessage = (apiMessage, pubKeys, currentInterlocutorId) => {
  let interlocutorId = pubKeys[apiMessage.from]
  let isCurrentInterlocutor = false
  let message = {
    text: apiMessage.message,
    isMy: false,
    date: formatDate(apiMessage.sent)
  }

  Storage.set(interlocutorId, message)
  if (currentInterlocutorId === interlocutorId)
    isCurrentInterlocutor = true
  
  return {
    type: 'GET_MESSAGE',
    message, 
    isCurrentInterlocutor
  }
}
export const updateMessageText = text => {
  return {
    type: 'UPDATE_MESSAGE_TEXT',
    text
  }
}