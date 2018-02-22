import { REPLACE_INVITATIONS, ACCEPT_INVITATION, REJECT_INVITATION, ACCEPT_INVITATION_BY_INTERLOCUTOR,
         REJECT_INVITATION_BY_INTERLOCUTOR, SEND_INVITATION, ADD_INVITATION, UPDATE_INVITED_USER_PROFILE } from '../constants'
import convertToStateInvitation from '../utils/convertToStateInvitation'

export const replaceInvitations = async apiUser => {
  const getInvitations = (invitations, isMy) => {
    if (!invitations.length) return {}
    return invitations.reduce((obj, inv) => {
      return inv.getUser().then(user => {
        obj[inv.id] = convertToStateInvitation(inv, user, isMy)
        return obj
      })
    }, {})
  }

  let sentInvitations = apiUser.getSentInvitations().then(invitations => {
    return getInvitations(invitations, true)
  })
  let inboxInvitations = apiUser.getInboxInvitations().then(invitations => {
    return getInvitations(invitations, false)
  })
  let invitations = await Promise.all([sentInvitations, inboxInvitations]).then(invitations => {
    return Object.assign({}, invitations[0], invitations[1])
  }) 
  return {
    type: REPLACE_INVITATIONS,
    invitations
  }
}

export const acceptInvitation = async (invitation, apiUser, interactor) => {
  let response = await apiUser.acceptInvitation(invitation.apiInvitation).then(result => {return result})
  return {
    type: ACCEPT_INVITATION,
    invitation,
    interactor,
    response
  }
}

export const rejectInvitation = async (invitation, apiUser) => {
  let invitationId = invitation.id
  let response = await apiUser.rejectInvitation(invitation.apiInvitation).then(result => {return result})
  return { 
    type: REJECT_INVITATION,
    invitationId,
    response
  }
}

export const acceptInvitationByInterlocutor = invitation => {
  return {
    type: ACCEPT_INVITATION_BY_INTERLOCUTOR,
    invitation
  }
}

export const rejectInvitationByInterlocutor = invitation => {
  return {
    type: REJECT_INVITATION_BY_INTERLOCUTOR,
    invitation
  }
}

export const sendInvitation = async (apiUser, apiInteractor) => {
  let response = await apiUser.invite(apiInteractor).then(response => {return response})
  return {
    type: SEND_INVITATION,
    response
  }
}

export const addInvitation = async (apiInvitation, isMy) => {
  let invitation = await apiInvitation.getUser().then(user => {
    return convertToStateInvitation(apiInvitation, user, isMy)
  })
  return {
    type: ADD_INVITATION,
    invitation
  }
}

export const updateInvitedUserProfile = invitation => {
  let profile = invitation.apiUser.getProfile()
  let invitationId = invitation.id
  return {
    type: UPDATE_INVITED_USER_PROFILE,
    profile,
    invitationId
  }
}