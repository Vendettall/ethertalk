export const initInvitations = invitations => {
  return {
    type: 'INIT_INVITATIONS',
    invitations
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