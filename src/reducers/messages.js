import { UPDATE_MESSAGE_TEXT, GET_MESSAGE, SEND_MESSAGE_SUCCESS, SETUP_NEW_CHAT } from '../constants'


const initialState = {
  text: '',
  messages: [],
  apiInterlocutor: null
}

export default function messages(state = initialState, { type, payload }) {
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
    case SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        text: '',
        messages: [
          ...state.messages,
          payload.message
        ]
      }
    }
    case SETUP_NEW_CHAT:
      return {
        ...state,
        text: '',
        messages: payload.messages,
        apiInterlocutor: payload.apiInterlocutor
      }
    default:
      return state
  }
}