import { connect } from 'react-redux'
import { acceptInvitation, rejectInvitation } from '../actions'
import ShowInvitation from '../components/ShowInvitation'

const mapStateToProps = (state, ownProps) => {
  return {
    apiUser: state.currentUser.apiUser,
    interlocutor: ownProps.interlocutor,
    invitation: ownProps.invitation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAccept: (apiUser, interlocutor, invitation) => dispatch(acceptInvitation(invitation, apiUser, interlocutor)),
    onReject: (apiUser, invitation) => dispatch(rejectInvitation(invitation, apiUser))
  }
}

const ProceedInvitationAnswer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowInvitation)

export default ProceedInvitationAnswer