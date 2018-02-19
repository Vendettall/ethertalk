import convertToStateUser from '../utils/convertToStateUser'

export const replaceInvitations = async apiUser => {
  let sentInvitations = apiUser.getSentInvitations().then(invitations => {
    if (!invitations.length) return {}
    return invitations.reduce((obj, inv) => {
      return inv.getUser().then(user => {
        obj[inv.id] = {
          id: inv.id,
          isMy: true,
          apiInvitation: inv,
          user: convertToStateUser(user)
        }
        return obj
      })
    }, {})
  })
  let inboxInvitations = apiUser.getInboxInvitations().then(invitations => {
    if (!invitations.length) return {}
    return invitations.reduce((obj, inv) => {
      return inv.getUser().then(user => {
        obj[inv.id] = {
          id: inv.id,
          isMy: false,
          apiInvitation: inv,
          user: convertToStateUser(inv.user)
        }
        return obj
      })
    }, {})
  })
  let invitations = await Promise.all([sentInvitations, inboxInvitations]).then(invitations => {
    return Object.assign({}, invitations[0], invitations[1])
  }) 
  return {
    type: 'REPLACE_INVITATIONS',
    invitations
  }
}

export const acceptInvitation = async (invitation, apiUser, interlocutor) => {
  let invitationId = invitation.id
  let response = await apiUser.acceptInvitation(invitation.apiInvitation).then(result => {return result})
  response = response? true: false 
  return {
    type: 'ACCEPT_INVITATION',
    invitationId,
    interlocutor,
    response
  }
}

export const rejectInvitation = async (invitation, apiUser) => {
  let invitationId = invitation.id
  let response = await apiUser.rejectInvitation(invitation.apiInvitation).then(result => {return result})
  response = response? true: false  
  return { 
    type: 'REJECT_INVITATION',
    invitationId,
    response
  }
}

export const sendInvitation = async (currentApiUser, apiUser) => {
  let response = currentApiUser.invite(apiUser).then(response => {return response})
  response = response? true: false
  return {
    type: 'SEND_INVITATION',
    response
  }
}

export const addInvitation = invitation => {
  return {
    type: 'ADD_INVITATION',
    invitation
  }
}

export const deleteInvitation = id => {
  return {
    type: 'DELETE_INVITATION',
    id
  }
}