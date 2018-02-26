import { connect } from 'react-redux'
import { registerUser, updateRegistrationName, updateRegistrationAvatar } from '../actions'
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
    emitUploadClick: uploadAvatarRef => uploadAvatarRef.click(),
    onRegister: (api, account, name, avatar) =>
      dispatch(registerUser(api, account, name, avatar))
  }
}

const RegisterNewUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default RegisterNewUser