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

export const setChatView = (view, id) => {
  return {
    type: 'SET_CHAT_VIEW',
    view,
    id
  }
}