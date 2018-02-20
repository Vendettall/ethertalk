const fallback = {
  view: 'SHOW_FALLBACK',
  id: null
}

export default function chatView(state = fallback, action) {
  switch (action.type) {
    case 'SET_CHAT_VIEW':
      return {
        view: action.view,
        id: action.interlocutor
      }
    case 'ACCEPT_INVITATION': {
      if (action.response) {
        return {
          view: 'CHAT_WITH_USER',
          id: action.interlocutor
        }
      }
      else {
        return state
      }
    }
    case 'REJECT_INVITATION': {
      if (action.response) {
        return fallback
      } else {
        return state
      }
    }
    default:
      return state
  }
}