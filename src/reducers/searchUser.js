import { TOGGLE_FORM, UPDATE_SEARCH_TEXT, SEARCH_USER_SUCCESS, SEND_INVITATION_SUCCESS } from '../constants'

const initialState = {
  isOpened: false,
  text: '',
  response: {
    stateUser: null,
    apiUser: null,
    answer: ''
  }
}

export default function searchUser(state = initialState, { type, payload }) {
  switch (type) {
    case TOGGLE_FORM: 
      return { ...state, isOpened: !payload.isOpened }
    case UPDATE_SEARCH_TEXT:
      return { ...state, text: payload.text }
    case SEARCH_USER_SUCCESS:
      return { ...state, response: payload.response }
    case SEND_INVITATION_SUCCESS: {
      return { 
        ...state,
        response: {
          ...state.response,
          answer: 'Invitation was sent.'
        } 
      }
    }
    default:
      return state
  }
}