const initialState = {
  isOpened: false,
  text: '',
  response: {
    stateUser: null,
    apiUser: null,
    answer: ''
  }
}

export default function searchUserForm(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FORM': 
      return Object.assign({}, state, {isOpened: !action.isOpened})
    case 'UPDATE_SEARCH_TEXT':
      return Object.assign({}, state, {text: action.text})
    case 'SEARCH_USER':
      return Object.assign({}, state, {response: action.response})
    case 'SEND_INVITATION': {
      let newResponse = state.response
      if (action.response) newResponse.answer = ('Invitation was sent.')
      else newResponse.answer = ('An error occured.')
      return Object.assign({}, state, {})
    }
    default:
      return state
  }
}