export const toggleInviteUserForm = isOpened => {
  return {
    type: 'TOGGLE_INVITE_USER_FORM',
    isOpened
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const addInvitation = (user, isMy) => {
  return {
    type: 'ADD_INVITATION',
    user,
    isMy
  }
}

export const deleteInvitation = id => {
  return {
    type: 'DELETE_INVITATION',
    id
  }
}

export const addContact = user => {
  return {
    type: 'ADD_CONTACT',
    user
  }
}

export const deleteContact = id => {
  return {
    type: 'DELETE_CONTACT',
    id
  }
}

export const setChatView = (view, id) => {
  return {
    type: 'SET_CHAT_VIEW',
    view,
    id
  }
}

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

export const initCurrentUser = user => {
  return {
    type: 'INIT_CURRENT_USER',
    user
  }
}