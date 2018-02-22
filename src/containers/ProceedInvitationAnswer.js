import { connect } from 'react-redux'
import { acceptInvitation, rejectInvitation } from '../actions'
import ShowInvitation from '../components/ShowInvitation'

const mapStateToProps = (state, ownProps) => {
  return {
    apiUser: state.user.apiUser,
    interactor: ownProps.interactor,
    invitation: ownProps.invitation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAccept: (apiUser, interactor, invitation) => dispatch(acceptInvitation(invitation, apiUser, interactor)),
    onReject: (apiUser, invitation) => dispatch(rejectInvitation(invitation, apiUser))
  }
}

const ProceedInvitationAnswer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowInvitation)

export default ProceedInvitationAnswer