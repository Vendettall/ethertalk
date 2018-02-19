export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const setChatView = (view, interlocutor) => {
  return {
    type: 'SET_CHAT_VIEW',
    view,
    interlocutor
  }
}