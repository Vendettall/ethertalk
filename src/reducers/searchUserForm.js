const initialState = {
  isOpened: false,
  text: '',
  response: {
    stateUser: null,
    apiUser: null,
    answer: ''
  }
}

// const stub = {
//   isOpened: false,
//   text: '',
//   response: {
//     stateUser: {
//      id: 1,
//      name: 'Egor',
//      avatar: 'EgorsAvatar'
//     },
//     answer: 'You can invite this user.',
//     apiUser: null
//   },
// }

export default function searchUserForm(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FORM': {
      return Object.assign({}, state, {isOpened: !action.isOpened})
    }
    case 'UPDATE_SEARCH_TEXT': {
      return Object.assign({}, state, {text: action.text})
    }
    case 'RESPONSE_STATE_USER': {
      let newResponse = Object.assign(state.response, {stateUser: action.stateUser})
      return Object.assign({}, state, {response: newResponse})
    }
    case 'RESPONSE_API_USER': {
      let newResponse = Object.assign(state.response, {apiUser: action.apiUser})
      return Object.assign({}, state, {response: newResponse})
    }
    case 'RESPONSE_ANSWER': {
      let newResponse = Object.assign(state.response, {answer: action.answer})
      return Object.assign({}, state, {response: newResponse})
    }
    case 'WIPE_PREVIOUS_RESPONSE': {
      console.log("WIPE", Object.assign({}, state, {response: initialState.response}))
      return Object.assign({}, state, {response: initialState.response})
    }
    default:
      return state
  }
}