import { FETCH_INVITATIONS_SUCCESS, ACCEPT_INVITATION_SUCCESS, REJECT_INVITATION_SUCCESS, ADD_INVITATION_SUCCESS, 
  REMOVE_INVITATION, UPDATE_INVITEE_PROFILE } from '../constants'

  
export default function invitations(state = {}, { type, payload }) {
  let newState
  switch (type) {
    case FETCH_INVITATIONS_SUCCESS:
      return payload.invitations
    case ADD_INVITATION_SUCCESS:
      return { ...state, [payload.invitation.id]: payload.invitation }
    case ACCEPT_INVITATION_SUCCESS:
    case REJECT_INVITATION_SUCCESS:
    case REMOVE_INVITATION: {
      newState = { ...state }
      delete newState[payload.invitationId]
      return newState
    }
    case UPDATE_INVITEE_PROFILE:
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