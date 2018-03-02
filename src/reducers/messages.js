import { UPDATE_MESSAGE_TEXT, GET_MESSAGE, SEND_MESSAGE, CHOOSE_CHAT_VIEW, CHAT_VIEWS } from '../constants'
import Storage from '../utils/storage'

const initialState = {
  text: '',
  messages: [],
  apiInterlocutor: null
}

export default function messages(state = initialState, {type, payload}) {
  switch (type) {
    case UPDATE_MESSAGE_TEXT:
      return { ...state, text: payload.text }
    case GET_MESSAGE: {
      if (payload.isCurrentInterlocutor)
        return {
          ...state,
          messages: [
            ...state.messages,
            payload.message
          ]
        }

      return state
    }
    case SEND_MESSAGE: {
      if (payload.response)
        return {
          ...state,
          text: '',
          messages: [
            ...state.messages,
            payload.message
          ]
        }

      return state
    }
    case CHOOSE_CHAT_VIEW: {
      if (payload.view === CHAT_VIEWS.CHAT_WITH_USER) {
        let messages = Storage.get(payload.interactor.id) || []
        return {
          ...state,
          text: '',
          messages: messages,
          apiInterlocutor: payload.interactor.apiUser
        }
      }

      return state
    }
    default:
      return state
  }
}