import { connect } from 'react-redux'
import { toggleInviteUserForm } from '../actions'
import InviteUser from '../components/InviteUser'

const mapStateToProps = state => {
  return {
    isOpened: state.inviteUserForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggle: isOpened => {
      dispatch(toggleInviteUserForm(isOpened))
    }
  }
}

const ToggleUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteUser)

export default ToggleUserForm