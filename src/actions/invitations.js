import { FETCH_INVITATIONS_REQUEST, FETCH_INVITATIONS_SUCCESS, FETCH_INVITATIONS_ERROR,
  ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, ACCEPT_INVITATION_ERROR,
  REJECT_INVITATION_REQUEST, REJECT_INVITATION_SUCCESS, REJECT_INVITATION_ERROR,
  SEND_INVITATION_REQUEST, SEND_INVITATION_SUCCESS, SEND_INVITATION_ERROR,
  ADD_INVITATION_REQUEST, ADD_INVITATION_SUCCESS, ADD_INVITATION_ERROR,
  REMOVE_INVITATION, UPDATE_INVITEE_PROFILE, UPDATE_INVITEE_PROFILE_EVENT } from '../constants'


export const fetchInvitationsRequest = (api, apiUser) => {
  return {
    type: FETCH_INVITATIONS_REQUEST,
    payload: ({ api, apiUser })
  }
}

export const fetchInvitationsSuccess = invitations => {
  return {
    type: FETCH_INVITATIONS_SUCCESS,
    payload: ({ invitations })
  }
}

export const fetchInvitationsError = error => {
  return {
    type: FETCH_INVITATIONS_ERROR,
    payload: new Error(error),
    error: true
  }
}

export const acceptInvitationRequest = (invitation, interactor) => {
  return {
    type: ACCEPT_INVITATION_REQUEST,
    payload: ({ invitation, interactor })
  }
}

export const acceptInvitationSuccess = invitationId => {
  return {
    type: ACCEPT_INVITATION_SUCCESS,
    payload: ({ invitationId })
  }
}

export const acceptInvitationError = error => {
  return {
    type: ACCEPT_INVITATION_ERROR,
    payload: new Error(error),
    error: true
  }
}

export const rejectInvitationRequest = invitation => {
  return { 
    type: REJECT_INVITATION_REQUEST,
    payload: ({ invitation })
  }
}

export const rejectInvitationSuccess = invitationId => {
  return {
    type: REJECT_INVITATION_SUCCESS,
    payload: ({ invitationId })
  }
}

export const rejectInvitationError = error => {
  return {
    type: REJECT_INVITATION_ERROR,
    payload: new Error(error),
    error: true
  }
}

export const sendInvitationRequest = apiInteractor => {
  return {
    type: SEND_INVITATION_REQUEST,
    payload: ({ apiInteractor })
  }
}

export const sendInvitationSuccess = () => {
  return {
    type: SEND_INVITATION_SUCCESS
  }
}

export const sendInvitationError = error => {
  return {
    type: SEND_INVITATION_ERROR,
    payload: new Error(error),
    error: true
  }
}

export const addInvitationRequest = (apiInvitation, isMy) => {
  return {
    type: ADD_INVITATION_REQUEST,
    payload: ({ apiInvitation, isMy })
  }
}

export const addInvitationSucces = invitation => {
  return {
    type: ADD_INVITATION_SUCCESS,
    payload: ({ invitation })
  }
}

export const addInvitationError = error => {
  return {
    type: ADD_INVITATION_ERROR,
    payload: new Error(error),
    error: true
  }
}

export const removeInvitation = invitationId => {
  return {
    type: REMOVE_INVITATION,
    payload: ({ invitationId })
  }
}

export const updateInviteeProfileEvent = invitation => {
  return {
    type: UPDATE_INVITEE_PROFILE_EVENT,
    payload: ({ invitation })
  }
}

export const updateInviteeProfile = (invitationId, profile) => {
  return {
    type: UPDATE_INVITEE_PROFILE,
    payload: ({ invitationId, profile })
  }
}