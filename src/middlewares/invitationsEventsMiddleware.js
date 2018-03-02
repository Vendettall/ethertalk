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
  // proceed accept/decline invitations and then do the same with listeners for them and for their users
  let {type, payload} = action
  
  if (action.type === REPLACE_INVITATIONS) {
    let prevInvitations = store.getState().invitations

    if (Object.keys(prevInvitations).length) {
      Object.keys(prevInvitations).forEach(invitation => {
        if (invitation.isMy)
          removeSentInvitationsHandler(prevInvitations[invitation])
        removeInvitationsHandler(prevInvitations[invitation])
      })
    }

    Object.keys(payload.invitations).forEach(invitation => {
      if (invitation.isMy)
        setupSentInvitationsHandler(payload.invitations[invitation])
      setupInvitationsHandler(payload.invitations[invitation])
    })
  } else if (type === ADD_INVITATION) {
      setupInvitationsHandler(payload.invitation)
      setupSentInvitationsHandler(payload.invitation)
  } else if (type === REJECT_INVITATION_BY_INTERACTOR ||
             type === ACCEPT_INVITATION_BY_INTERACTOR) {
      removeSentInvitationsHandler(payload.invitation)
      removeInvitationsHandler(payload.invitation)
  }

  return next(action)
}