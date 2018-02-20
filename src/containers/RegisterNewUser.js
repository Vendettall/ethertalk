import { connect } from 'react-redux'
import { registerCurrentUser } from '../actions/currentUser'
import { updateRegistrationName, updateRegistrationAvatar } from '../actions/registerUser'
import RegistrationForm from '../components/RegistrationForm'

const mapStateToProps = state => {
  return {
    api: state.general.api,
    account: state.accounts.active,
    avatar: state.registerUserForm.avatar,
    name: state.registerUserForm.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateName: name => dispatch(updateRegistrationName(name)),
    onUpdateAvatar: avatar => dispatch(updateRegistrationAvatar(avatar)),
    emitUploadClick: () => document.getElementById('upload_avatar').click(),
    onRegister: (api, account, name, avatar) =>
      dispatch(registerCurrentUser(api, account, name, avatar))
  }
}

const RegisterNewUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default RegisterNewUser