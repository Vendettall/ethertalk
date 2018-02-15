import { connect } from 'react-redux'
import { setChatView } from '../actions'
import { deleteInvitation } from '../actions/invitations'
import { showMessageHistory } from '../actions/messages'
import { addContact } from '../actions/contacts'
import ShowInvitation from '../components/ShowInvitation'

function getInvitation(apiUser, invitationId) {
  return apiUser.getInboxInvitations().then(invitations => {
    return invitations.find(invitation => invitation.id === invitationId)
  })
}

function acceptInvitation(apiUser, interlocutor, invitationId, dispatch) {
  getInvitation(apiUser, invitationId).then(invitation => {
    apiUser.acceptInvitation(invitation)
    dispatch(addContact({[interlocutor.id]: interlocutor}))
    dispatch(showMessageHistory(interlocutor.id))
    dispatch(setChatView('CHAT_WITH_USER', interlocutor.id))
    dispatch(deleteInvitation(invitationId)) // should be after changing chatView
    return
  })
}

function rejectInvitation(apiUser, invitationId, dispatch) {
  getInvitation(apiUser, invitationId).then(invitation => {
    apiUser.rejectInvitation(invitation)
    dispatch(setChatView('SHOW_FALLBACK', null))
    dispatch(deleteInvitation(invitationId)) // should be after changing chatView
  })
}

const mapStateToProps = (state, ownProps) => {
  return {
    apiUser: state.currentUser.apiUser,
    interlocutor: ownProps.interlocutor,
    invitationId: ownProps.invitationId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAccept: (apiUser, interlocutor, invitationId) => 
      acceptInvitation(apiUser, interlocutor, invitationId, dispatch),
    onReject: (apiUser, invitationId) =>
      rejectInvitation(apiUser, invitationId, dispatch)
  }
}

const ProceedInvitationAnswer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowInvitation)

export default ProceedInvitationAnswer