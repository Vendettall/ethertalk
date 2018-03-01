import { TOGGLE_FORM, UPDATE_SEARCH_TEXT, SEARCH_USER, SEND_INVITATION } from '../constants'

const initialState = {
  isOpened: false,
  text: '',
  response: {
    stateUser: null,
    apiUser: null,
    answer: ''
  }
}

export default function searchUser(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FORM: 
      return { ...state, isOpened: !action.isOpened }
    case UPDATE_SEARCH_TEXT:
      return { ...state, text: action.text }
    case SEARCH_USER:
      return { ...state, response: action.response }
    case SEND_INVITATION: {
      let newResponse = state.response
      
      if (action.response) 
        newResponse.answer = 'Invitation was sent.'
      else
        newResponse.answer = 'An error occured.'

      return { ...state, response: newResponse }
    }
    default:
      return state
  }
}