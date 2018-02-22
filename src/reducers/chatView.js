import { CHOOSE_VISIBILITY_FILTER, CHOOSE_CHAT_VIEW, ACCEPT_INVITATION, REJECT_INVITATION,
         VISIBILITY_FILTERS, CHAT_VIEWS } from '../constants'

const fallback = {
  view: CHAT_VIEWS.SHOW_FALLBACK,
  filter: VISIBILITY_FILTERS.SHOW_CONTACTS,
  interactor: null
}

export default function chatView(state = fallback, action) {
  switch (action.type) {
    case CHOOSE_CHAT_VIEW:
      return {
        ...state, 
        view: action.view,
        interactor: action.interactor
      }
    case CHOOSE_VISIBILITY_FILTER:
      return { ...state, filter: action.filter }
    case ACCEPT_INVITATION: {
      if (action.response)
        return {
          ...state,
          view: CHAT_VIEWS.CHAT_WITH_USER,
          interactor: action.invitation
        }
      return state
    }
    case REJECT_INVITATION: {
      if (action.response)
        return fallback
      return state
    }
    default:
      return state
  }
}