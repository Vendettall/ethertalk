export const showMessageHistory = userId => {
  return {
    type: 'SHOW_MESSAGE_HISTORY',
    userId
  }
}

export const addMessage = (text, avatar) => {
  return {
    type: 'ADD_MESSAGE',
    text,
    avatar
  }
}

export const updateMessageText = text => {
  return {
    type: 'UPDATE_MESSAGE_TEXT',
    text
  }
}