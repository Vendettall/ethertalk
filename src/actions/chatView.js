import { CHOOSE_VISIBILITY_FILTER, CHOOSE_CHAT_VIEW } from '../constants'

export const chooseVisibilityFilter = filter => { // choose which tab show to user
  return {
    type: CHOOSE_VISIBILITY_FILTER,
    payload: ({ filter })
  }
}

export const chooseChatView = (view, interactor) => { // choose view after click on any user from tabs
  return {
    type: CHOOSE_CHAT_VIEW,
    payload: ({ view, interactor })
  }
}