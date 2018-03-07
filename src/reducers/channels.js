import { UPDATE_USER_CHANNEL, ADD_CONTACT_CHANNEL, REMOVE_CONTACTS_CHANNELS, DELETE_CONTACT,
  ADD_INVITATION_CHANNEL, REMOVE_INVITATION, REMOVE_INVITATIONS_CHANNELS } from '../constants'

const initialState = {
  userChannel: null,
  contactsChannels: {},
  invitationsChannels: {}
}

export default function channels(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_USER_CHANNEL:
      return { ...state, userChannel: payload.userChannel }
    case ADD_CONTACT_CHANNEL:
      return {
        ...state,
        contactsChannels: {
          ...state.contactsChannels,
          [payload.contactId]: payload.contactChannel
        }
      }
    case DELETE_CONTACT: {
      let newState = { ...state }
      delete newState.contactsChannels[payload.contactId]
      return newState
    }
    case REMOVE_CONTACTS_CHANNELS:
      return { ...state, contactsChannels: initialState.contactsChannels }
    case ADD_INVITATION_CHANNEL:
      return {
        ...state,
        invitationsChannels: {
          ...state.invitationsChannels,
          [payload.invitationId]: payload.invitationChannel
        }
      } 
    case REMOVE_INVITATION: {
      let newState = { ...state }
      delete newState.invitationsChannels[payload.invitationId]
      return newState
    }
    case REMOVE_INVITATIONS_CHANNELS:
      return { ...state, invitationsChannels: initialState.invitationsChannels }
    default:
      return state
  }
}