import { REPLACE_INVITATIONS, ACCEPT_INVITATION, REJECT_INVITATION, ADD_INVITATION, ACCEPT_INVITATION_BY_INTERLOCUTOR,
         REJECT_INVITATION_BY_INTERLOCUTOR, UPDATE_INVITED_USER_PROFILE } from '../constants'

export default function invitations(state = {}, action) {
  let newState
  switch (action.type) {
    case REPLACE_INVITATIONS:
      return action.invitations
    case ACCEPT_INVITATION:
      if (action.response) {
        newState = Object.assign({}, state)
        delete newState[action.invitation.id]
        return newState
      } else {
        return state // subscribe error checker somewhere
      }
    case REJECT_INVITATION: {
      if (action.response) {
        newState = Object.assign({}, state)
        delete newState[action.invitationId]
        return newState
      } else {
        return state // subscribe error checker somewhere
      }
    }
    case ADD_INVITATION:
      return Object.assign({}, state, action.invitation)
    case ACCEPT_INVITATION_BY_INTERLOCUTOR:
    case REJECT_INVITATION_BY_INTERLOCUTOR:
      newState = Object.assign({}, state)
      delete newState[action.invitation.id]
      return newState
    case UPDATE_INVITED_USER_PROFILE:
      let invitationUser = Object.assign({}, state[action.invitationId].user)
      invitationUser.name = action.profile.name
      invitationUser.avatar = action.profile.avatar
      let invitation = Object.assign({}, state[action.invitationId], {user: invitationUser})
      return Object.assign({}, state, {[action.invitation]: invitation})
    default:
      return state
  }
}