import { REPLACE_INVITATIONS, ACCEPT_INVITATION, REJECT_INVITATION, ADD_INVITATION, ACCEPT_INVITATION_BY_INTERACTOR,
         REJECT_INVITATION_BY_INTERACTOR, UPDATE_INVITED_USER_PROFILE } from '../constants'
import { addNotification } from '../actions'

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
      let errorText = 'Error. Invitation wasn\'t accepted.'
      action.asyncDispatch(addNotification(errorText))
      console.log(errorText)
      return state
    }
    case REJECT_INVITATION: {
      if (action.response) {
        newState = { ...state }
        delete newState[action.invitationId]
        return newState
      }
      let errorText = 'Error. Invitation wasn\'t rejected.'
      action.asyncDispatch(addNotification(errorText))
      console.log(errorText)
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
            name: action.profile[0],
            avatar: action.profile[1]
          }
        }
      }
    default:
      return state
  }
}