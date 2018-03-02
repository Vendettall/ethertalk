import { REPLACE_INVITATIONS, ACCEPT_INVITATION, REJECT_INVITATION, ADD_INVITATION, ACCEPT_INVITATION_BY_INTERACTOR,
         REJECT_INVITATION_BY_INTERACTOR, UPDATE_INVITED_USER_PROFILE } from '../constants'
import { addNotification } from '../actions'

export default function invitations(state = {}, {type, payload}) {
  let newState
  switch (type) {
    case REPLACE_INVITATIONS:
      return payload.invitations
    case ACCEPT_INVITATION: {
      if (payload.response) {
        newState = { ...state }
        delete newState[payload.invitation.id]
        return newState
      }

      let errorText = 'Error. Invitation wasn\'t accepted.'
      payload.asyncDispatch(addNotification(errorText))
      console.log(errorText)
      
      return state
    }
    case REJECT_INVITATION: {
      if (payload.response) {
        newState = { ...state }
        delete newState[payload.invitationId]
        return newState
      }

      let errorText = 'Error. Invitation wasn\'t rejected.'
      payload.asyncDispatch(addNotification(errorText))
      console.log(errorText)

      return state
    }
    case ADD_INVITATION:
      return { ...state, [payload.invitation.id]: payload.invitation }
    case ACCEPT_INVITATION_BY_INTERACTOR:
    case REJECT_INVITATION_BY_INTERACTOR: {
      newState = { ...state }
      delete newState[payload.invitation.id]
      return newState
    }
    case UPDATE_INVITED_USER_PROFILE:
      return { 
        ...state,
        [payload.invitation]: {
          ...state[payload.invitationId],
          user: {
            ...state[payload.invitationId].user,
            name: payload.profile[0],
            avatar: payload.profile[1]
          }
        }
      }
    default:
      return state
  }
}