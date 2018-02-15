export const showMessageHistory = messages => {
  return {
    type: 'SHOW_MESSAGE_HISTORY',
    messages
  }
}

export const updateApiInterlocutor = apiUser => {
  return {
    type: 'UPDATE_API_INTERLOCUTOR',
    apiUser
  }
}

export const addMessage = message => {
  return {
    type: 'ADD_MESSAGE',
    message
  }
}

export const updateMessageText = text => {
  return {
    type: 'UPDATE_MESSAGE_TEXT',
    text
  }
}

export const wipeMessageText = () => {
  return {
    type: 'WIPE_MESSAGE_TEXT'
  }
}