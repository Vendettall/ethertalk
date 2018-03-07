import { FETCH_CONTACTS_SUCCESS, ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT_PROFILE } from '../constants'


export default function contacts(state = {}, { type, payload }) {
  switch (type) {
    case FETCH_CONTACTS_SUCCESS:
      return payload.contacts
    case ADD_CONTACT:
      return { ...state, [payload.contact.id]: payload.contact }
    case DELETE_CONTACT: {
      let newState = { ...state }
      delete newState[payload.contactId]
      
      return newState
    }
    case UPDATE_CONTACT_PROFILE:
      return {
        ...state,
        [payload.contactId]: {
          ...state[payload.contactId],
          name: payload.profile[0],
          avatar: payload.profile[1]
        }
      }
    default:
      return state
  }
}