import { connect } from 'react-redux'
import { registerCurrentUser, updateRegistrationName, updateRegistrationAvatar } from '../actions'
import RegistrationForm from '../components/RegistrationForm'

const mapStateToProps = state => {
  return {
    api: state.general.api,
    account: state.accounts.active,
    avatar: state.registerUser.avatar,
    name: state.registerUser.name
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