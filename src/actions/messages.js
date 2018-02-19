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

export const updateMessageText = text => {
  return {
    type: 'UPDATE_MESSAGE_TEXT',
    text
  }
}