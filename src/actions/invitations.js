import { REPLACE_INVITATIONS, ACCEPT_INVITATION, REJECT_INVITATION, ACCEPT_INVITATION_BY_INTERLOCUTOR,
         REJECT_INVITATION_BY_INTERLOCUTOR, SEND_INVITATION, ADD_INVITATION, UPDATE_INVITED_USER_PROFILE } from '../constants'
import convertToStateInvitation from '../utils/convertToStateInvitation'

export const replaceInvitations = async (api, apiUser) => {
  const getInvitations = (invitations, isMy) => {
    let getInvitationsPromises = invitations.map(inv => {
      return inv.getUser()
        .then(user => {
          return convertToStateInvitation(api, inv, user, isMy)
            .then(result => {return result})
        })
    })
    return Promise.all(getInvitationsPromises)
      .then(invitations => {
        if (!invitations.length) return {}
        return invitations.reduce((obj, inv) => {
          obj[inv.id] = inv
          return obj
        }, {})
      })
  }

  let sentInvitations = apiUser.getSentInvitations()
    .then(invitations => {
      return getInvitations(invitations, true)
    })
  let inboxInvitations = apiUser.getInboxInvitations()
    .then(invitations => {
      return getInvitations(invitations, false)
    })
  let invitations = await Promise.all([sentInvitations, inboxInvitations])
    .then(invitations => {
      return Object.assign({}, invitations[0], invitations[1])
    }) 

  return {
    type: REPLACE_INVITATIONS,
    payload: {
      invitations: invitations
    }
  }
}

export const acceptInvitation = async (invitation, apiUser, interactor) => { // if user accept invitation
  let response = await apiUser.acceptInvitation(invitation.apiInvitation)
    .then(result => {return result})

  return {
    type: ACCEPT_INVITATION,
    payload: {
      invitation: invitation,
      interactor: interactor,
      response: response
    }
  }
}

export const rejectInvitation = async (invitation, apiUser) => { // if user reject invitation
  let invitationId = invitation.id
  let response = await apiUser.rejectInvitation(invitation.apiInvitation)
    .then(result => {return result})

  return { 
    type: REJECT_INVITATION,
    payload: {
      invitationId: invitationId,
      response: response
    }
  }
}

export const acceptInvitationByInterlocutor = invitation => { // if users invitation accepted
  return {
    type: ACCEPT_INVITATION_BY_INTERLOCUTOR,
    payload: {
      invitation: invitation
    }
  }
}

export const rejectInvitationByInterlocutor = invitation => { // if users invitation rejected
  return {
    type: REJECT_INVITATION_BY_INTERLOCUTOR,
    payload: {
      invitation: invitation
    }
  }
}

export const sendInvitation = async (apiUser, apiInteractor) => {
  let response = await apiUser.invite(apiInteractor)
    .then(response => {return response})

  return {
    type: SEND_INVITATION,
    payload: {
      response: response
    }
  }
}

export const addInvitation = async (api, apiInvitation, isMy) => {
  let invitation = await apiInvitation.getUser()
    .then(user => {
      return convertToStateInvitation(api, apiInvitation, user, isMy)
        .then(result => {return result})
    })

  return {
    type: ADD_INVITATION,
    payload: {
      invitation: invitation
    }
  }
}

export const updateInvitedUserProfile = async invitation => {
  let profile = await invitation.apiUser.getProfile()
    .then(result => {return result})
  let invitationId = invitation.id
  
  return {
    type: UPDATE_INVITED_USER_PROFILE,
    payload: {
      profile: profile,
      invitationId: invitationId
    }
  }
}