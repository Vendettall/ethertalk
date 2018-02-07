import { connect } from 'react-redux'
import { deleteInvitation, addContact, setChatView, showMessageHistory } from '../actions'
import ShowInvitation from '../components/ShowInvitation'

const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAccept: user => {
      dispatch(deleteInvitation(user.id))
      dispatch(addContact(user))
      dispatch(showMessageHistory(user.id))
      dispatch(setChatView('CHAT_WITH_USER', user.id))
    },
    onDecline: id => {
      dispatch(deleteInvitation(id))
      dispatch(setChatView('SHOW_FALLBACK'), null)
    }
  }
}

const ProceedInvitationAnswer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowInvitation)

export default ProceedInvitationAnswer