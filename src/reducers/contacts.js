import { REPLACE_CONTACTS, ADD_CONTACT, DELETE_CONTACT, ACCEPT_INVITATION, ACCEPT_INVITATION_BY_INTERACTOR,
         UPDATE_CONTACT_PROFILE } from '../constants'
import { replacePubKeys } from '../actions'

export default function contacts(state = {}, {type, payload}) {
  switch (type) {
    case REPLACE_CONTACTS: {
      payload.asyncDispatch(replacePubKeys(payload.contacts))
      
      return payload.contacts
    }
    case ADD_CONTACT:
      return { ...state, [payload.contact.id]: payload.contact }
    case DELETE_CONTACT: {
      let newState = { ...state }
      delete newState[payload.contact.id]

      return newState
    }
    case ACCEPT_INVITATION: {
      if (payload.response)
        return { ...state, [payload.interactor.id]: payload.interactor }

      return state
    }
    case ACCEPT_INVITATION_BY_INTERACTOR: {
      return { ...state, [payload.invitation.user.id]: payload.invitation.user }
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