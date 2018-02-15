const initialState = {
  text: '',
  messages: [],
  apiInterlocutor: null
}

export default function messages(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_MESSAGE_TEXT':
      return Object.assign({}, state, {text: action.text})
    case 'WIPE_MESSAGE_TEXT':
      return Object.assign({}, state, {text: ''})
    case 'SHOW_MESSAGE_HISTORY':
      return Object.assign({}, state, {messages: action.messages})
    case 'ADD_MESSAGE':
      return Object.assign({}, state, {messages: [...state.messages, action.message]})
    case 'UPDATE_API_INTERLOCUTOR':
    return Object.assign({}, state, {apiInterlocutor: action.apiUser})
    default:
      return state
  }
}