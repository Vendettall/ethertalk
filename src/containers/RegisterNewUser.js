import { connect } from 'react-redux'
import { updateUserName, updateUserAvatar } from '../actions/currentUser'
import { push } from 'react-router-redux'
import RegistrationForm from '../components/RegistrationForm'
import imageFromHash from '../utils/imageFromHash'

function register(general, apiUser, name, avatarAsFile, dispatch){
  general.api.Swarm.instance().upload(avatarAsFile).then(hash => {
    console.log('Image hash', hash)
    imageFromHash(general.api, hash).then(image => {
      dispatch(updateUserAvatar(image))
      apiUser.setProfile(name, hash)
      dispatch(push('/'))
      return
    })
  })
}

const mapStateToProps = state => {
  return {
    general: state.general,
    apiUser: state.currentUser.apiUser,
    avatar: state.currentUser.avatar,
    name: state.currentUser.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateName: name => dispatch(updateUserName(name)),
    updateAvatar: avatar => dispatch(updateUserAvatar(avatar)),
    emitUploadClick: () => document.getElementById('upload_avatar').click(),
    register: (general, apiUser, name, avatar) => register(general, apiUser, name, avatar, dispatch)
  }
}

const RegisterNewUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default RegisterNewUser