import { UPDATE_MESSAGE_TEXT, GET_MESSAGE, SEND_MESSAGE, CHOOSE_CHAT_VIEW, CHAT_VIEWS } from '../constants'
import Storage from '../utils/storage'

const initialState = {
  text: '',
  messages: [],
  apiInterlocutor: null
}

export default function messages(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGE_TEXT:
      return { ...state, text: action.text }
    case GET_MESSAGE: {
      if (action.isCurrentInterlocutor)
        return {
          ...state,
          messages: [
            ...state.messages,
            action.message
          ]
        }

      return state
    }
    case SEND_MESSAGE: {
      if (action.response)
        return {
          ...state,
          text: '',
          messages: [
            ...state.messages,
            action.message
          ]
        }

      return state
    }
    case CHOOSE_CHAT_VIEW: {
      if (action.view === CHAT_VIEWS.CHAT_WITH_USER) {
        let messages = Storage.get(action.interactor.id) || []
        return {
          ...state,
          text: '',
          messages: messages,
          apiInterlocutor: action.interactor.apiUser
        }
      }

      return state
    }
    default:
      return state
  }
}