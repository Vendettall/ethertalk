import Storage from '../utils/storage'
import formatDate from '../utils/formatDate'

export default function messages(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_MESSAGE_TEXT': {
      return Object.assign({}, state, {text: action.text})
    }
    case 'SHOW_MESSAGE_HISTORY': {
      let messages = Storage.get(action.userId.toString())
      if(!messages) messages = []
      return { userId: action.userId, text: '', messages: messages }
    }
    case 'ADD_MESSAGE': {
      let newState = Object.assign({}, state, { messages: [
        ...state.messages,
        {
          id: state.messages.length,
          text: action.text,
          avatar: action.avatar,
          date: formatDate(new Date())
        }
      ]})
      Storage.set(state.userId.toString(), newState.messages)
      return newState
    }
    default:
      return state
  }
}