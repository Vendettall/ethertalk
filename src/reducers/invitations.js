import { REPLACE_INVITATIONS, ACCEPT_INVITATION, REJECT_INVITATION, ADD_INVITATION, ACCEPT_INVITATION_BY_INTERACTOR,
         REJECT_INVITATION_BY_INTERACTOR, UPDATE_INVITED_USER_PROFILE } from '../constants'

export default function invitations(state = {}, action) {
  let newState
  switch (action.type) {
    case REPLACE_INVITATIONS:
      return action.invitations
    case ACCEPT_INVITATION: {
      if (action.response) {
        newState = { ...state }
        delete newState[action.invitation.id]
        return newState
      }
      console.log('Error. Invitation wasn\'t accepted.')
      return state
    }
    case REJECT_INVITATION: {
      if (action.response) {
        newState = { ...state }
        delete newState[action.invitationId]
        return newState
      }
      console.log('Error. Invitation wasn\'t rejected.')
      return state
    }
    case ADD_INVITATION:
      return { ...state, [action.invitation.id]: action.invitation }
    case ACCEPT_INVITATION_BY_INTERACTOR:
    case REJECT_INVITATION_BY_INTERACTOR: {
      newState = { ...state }
      delete newState[action.invitation.id]
      return newState
    }
    case UPDATE_INVITED_USER_PROFILE:
      return { 
        ...state,
        [action.invitation]: {
          ...state[action.invitationId],
          user: {
            ...state[action.invitationId].user,
            name: action.profile.name,
            avatar: action.profile.avatar
          }
        }
      }
    default:
      return state
  }
}