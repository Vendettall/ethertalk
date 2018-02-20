const initialState = {
  text: '',
  messages: [],
  apiInterlocutor: null
}

export default function messages(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_MESSAGE_TEXT':
      return Object.assign({}, state, {text: action.text})
    case 'GET_MESSAGE': {
      if (action.isCurrentInterlocutor) {
        return Object.assign({}, state, { messages: [...state.messages, action.message]})
      } else {
        return state
      }
    }
    case 'SEND_MESSAGE': {
      if (action.response) {
        return Object.assign({}, state, {text: '', messages: [...state.messages, action.message]})
      } else {
        return state
      }
    }
    case 'SET_CHAT_VIEW':
      if (action.view === 'CHAT_WITH_USER') {
        let messages = Storage.get(action.interlocutor.id.toString()) || []
        let apiInterlocutor = action.interlocutor.apiUser
        return Object.assign({}, state, {text: '', messages: messages, apiInterlocutor: apiInterlocutor})
      } else {
        return state
      }
    default:
      return state
  }
}