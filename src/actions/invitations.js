export const initInvitations = invitations => {
  return {
    type: 'INITI_INVITATIONS',
    invitations
  }
}

export const addInvitation = (user, isMy) => {
  return {
    type: 'ADD_INVITATION',
    user,
    isMy
  }
}

export const deleteInvitation = id => {
  return {
    type: 'DELETE_INVITATION',
    id
  }
}