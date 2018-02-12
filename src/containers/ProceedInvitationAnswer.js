import { connect } from 'react-redux'
import { setChatView } from '../actions'
import { deleteInvitation } from '../actions/invitations'
import { showMessageHistory } from '../actions/messages'
import { addContact } from '../actions/contacts'
import ShowInvitation from '../components/ShowInvitation'

function getInvitation(general, invitationId) {
  return general.user.getInboxInvitations().then(invitations => {
    return invitations.find(invitation => invitation.id === invitationId)
  })
}

function acceptInvitation(general, user, invitationId, dispatch) {
  getInvitation(general, invitationId).then(invitation => {
    general.user.acceptInvitation(invitation)
    dispatch(addContact({[user.id]: user}))
    dispatch(showMessageHistory(user.id))
    dispatch(setChatView('CHAT_WITH_USER', user.id))
    dispatch(deleteInvitation(invitationId)) // should be after changing chatView
    return
  })
}

function rejectInvitation(general, invitationId, dispatch) {
  getInvitation(general, invitationId).then(invitation => {
    general.user.rejectInvitation(invitation)
    dispatch(setChatView('SHOW_FALLBACK', null))
    dispatch(deleteInvitation(invitationId)) // should be after changing chatView
  })
}

const mapStateToProps = (state, ownProps) => {
  return {
    general: state.general,
    user: ownProps.user,
    invitationId: ownProps.invitationId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAccept: (general, user, invitationId) => 
      acceptInvitation(general, user, invitationId, dispatch),
    onReject: (general, invitationId) =>
      rejectInvitation(general, invitationId, dispatch)
  }
}

const ProceedInvitationAnswer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowInvitation)

export default ProceedInvitationAnswer