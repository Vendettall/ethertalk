import { CHOOSE_VISIBILITY_FILTER, CHOOSE_CHAT_VIEW, ACCEPT_INVITATION_SUCCESS, REJECT_INVITATION_SUCCESS,
         VISIBILITY_FILTERS, CHAT_VIEWS } from '../constants'

const fallback = {
  view: CHAT_VIEWS.SHOW_FALLBACK,
  filter: VISIBILITY_FILTERS.SHOW_CONTACTS,
  interactor: null
}

export default function chatView(state = fallback, { type, payload }) {
  switch (type) {
    case CHOOSE_CHAT_VIEW:
      return {
        ...state, 
        view: payload.view,
        interactor: payload.interactor
      }
    case CHOOSE_VISIBILITY_FILTER:
      return { ...state, filter: payload.filter }
    case ACCEPT_INVITATION_SUCCESS: {
      return {
        ...state,
        view: CHAT_VIEWS.CHAT_WITH_USER,
        interactor: payload.invitation.user
      }
    }
    case REJECT_INVITATION_SUCCESS: {
      return fallback
    }
    default:
      return state
  }
}