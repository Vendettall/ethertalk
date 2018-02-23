import { REPLACE_CONTACTS, ADD_CONTACT, DELETE_CONTACT, ACCEPT_INVITATION, ACCEPT_INVITATION_BY_INTERACTOR,
         UPDATE_CONTACT_PROFILE } from '../constants'

export default function contacts(state = {}, action) {
  switch (action.type) {
    case REPLACE_CONTACTS: 
      return action.contacts
    case ADD_CONTACT:
      return { ...state, [action.contact.id]: action.contact }
    case DELETE_CONTACT: {
      let newState = { ...state }
      delete newState[action.contact.id]
      return newState
    }
    case ACCEPT_INVITATION: {
      if (action.response)
        return { ...state, [action.interactor.id]: action.interactor }
      return state
    }
    case ACCEPT_INVITATION_BY_INTERACTOR: {
      return { ...state, [action.invitation.user.id]: action.invitation.user }
    }
    case UPDATE_CONTACT_PROFILE:
      return {
        ...state,
        [action.contactId]: {
          ...state[action.contactId],
          name: action.profile[0],
          avatar: action.profile[1]
        }
      }
    default:
      return state
  }
}