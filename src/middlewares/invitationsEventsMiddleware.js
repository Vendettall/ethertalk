import { REPLACE_INVITATIONS, ADD_INVITATION, REJECT_INVITATION_BY_INTERACTOR, ACCEPT_INVITATION_BY_INTERACTOR } from '../constants'
import { updateInvitedUserProfile, acceptInvitationByInteractor, rejectInvitationByInteractor } from '../actions'

export const invitationsMiddleware = store => next => action => {
  // setup handlers
  const setupInvitationsHandler = invitation => {
    invitation.user.apiUser.on('profileUpdated', () => {
      store.dispatch(updateInvitedUserProfile(invitation))
    })
  }
  const setupSentInvitationsHandler = invitation => {
    invitation.on('accepted', () => {
      store.dispatch(acceptInvitationByInteractor(invitation))
    })
    invitation.on('reject', () => {
      store.dispatch(rejectInvitationByInteractor(invitation))
    })
  }
  // remove handlers
  const removeInvitationsHandler = invitation => {
    invitation.user.apiUser.removeListener('profileUpdated', () => {
      store.dispatch(updateInvitedUserProfile(invitation))
    })
  }
  const removeSentInvitationsHandler = invitation => {
    invitation.removeListener('accepted', () => {
      store.dispatch(acceptInvitationByInteractor(invitation))
    })
    invitation.removeListener('reject', () => {
      store.dispatch(rejectInvitationByInteractor(invitation))
    })
  }
  //
  switch (action.type) {
    case REPLACE_INVITATIONS: {
      let prevInvitations = store.getState().invitations
      if (Object.keys(prevInvitations).length) {
        Object.keys(prevInvitations).forEach(invitation => {
          if (invitation.isMy)
            removeSentInvitationsHandler(prevInvitations[invitation])
          removeInvitationsHandler(prevInvitations[invitation])
        })
      }
      Object.keys(action.invitations).forEach(invitation => {
        if (invitation.isMy)
          setupSentInvitationsHandler(action.invitations[invitation])
        setupInvitationsHandler(action.invitations[invitation])
      })
      break
    } 
    case ADD_INVITATION: {
      setupInvitationsHandler(action.invitation)
      setupSentInvitationsHandler(action.invitation)
      break
    }
    case REJECT_INVITATION_BY_INTERACTOR:
    case ACCEPT_INVITATION_BY_INTERACTOR: {
      removeSentInvitationsHandler(action.invitation)
      removeInvitationsHandler(action.invitation)
      break
    }
    default:
  }

  return next(action)
}