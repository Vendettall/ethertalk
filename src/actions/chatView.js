import { CHOOSE_VISIBILITY_FILTER, CHOOSE_CHAT_VIEW } from '../constants'

export const chooseVisibilityFilter = filter => {
  return {
    type: CHOOSE_VISIBILITY_FILTER,
    filter
  }
}

export const chooseChatView = (view, interlocutor) => {
  return {
    type: CHOOSE_CHAT_VIEW,
    view,
    interlocutor
  }
}