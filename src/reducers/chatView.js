import { CHOOSE_VISIBILITY_FILTER, CHOOSE_CHAT_VIEW, ACCEPT_INVITATION, REJECT_INVITATION } from '../constants'

const fallback = {
  view: 'SHOW_FALLBACK',
  filter: 'SHOW_CONTACTS',
  interlocutor: null
}

export default function chatView(state = fallback, action) {
  switch (action.type) {
    case CHOOSE_CHAT_VIEW:
      return Object.assign({}, state, {
          view: action.view,
          interlocutor: action.interlocutor
        })
    case CHOOSE_VISIBILITY_FILTER:
      return Object.assign({}, state, {filter: action.filter})
    case ACCEPT_INVITATION: {
      if (action.response) {
        return Object.assign({}, state, {
          view: 'CHAT_WITH_USER',
          interlocutor: action.invitation
        })
      }
      else {
        return state
      }
    }
    case REJECT_INVITATION: {
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