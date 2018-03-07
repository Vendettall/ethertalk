import { UPDATE_USER_CHANNEL, ADD_CONTACT_CHANNEL, REMOVE_CONTACTS_CHANNELS,
  ADD_INVITATION_CHANNEL, REMOVE_INVITATIONS_CHANNELS } from '../constants'


export const updateUserChannel = userChannel => {
  return {
    type: UPDATE_USER_CHANNEL,
    payload: ({ userChannel })
  }
}

export const addContactChannel = (contactId, contactChannel) => {
  return {
    type: ADD_CONTACT_CHANNEL,
    payload: ({ contactId, contactChannel })
  }
}

export const removeContactsChannels = () => {
  return {
    type: REMOVE_CONTACTS_CHANNELS
  }
}

export const addInvitationChannel = (invitationId, invitationChannel) => {
  return {
    type: ADD_INVITATION_CHANNEL,
    payload: ({ invitationId, invitationChannel })
  }
}

export const removeInvitationsChannel = () => {
  return {
    type: REMOVE_INVITATIONS_CHANNELS
  }
}