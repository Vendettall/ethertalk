import { connect } from 'react-redux'
import { updateUserName, updateUserAvatar } from '../actions'
import { push } from 'react-router-redux'
import RegistrationForm from '../components/RegistrationForm'
import getBase64 from '../utils/imageToBase64'

const mapStateToProps = state => {
  return {
    avatar: state.currentUser.avatar,
    name: state.currentUser.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateName: name => {
      dispatch(updateUserName(name))
    },
    updateAvatar: avatar => {
      getBase64(avatar['0']).then(base64 => dispatch(updateUserAvatar(base64)))
    },
    emitUploadClick: () => {
      document.getElementById('upload_avatar').click()
    },
    register: (name, avatar) => {
      //TODO: use setProfile(name, avatar)
      console.log("REGISTERED")
      dispatch(push('/'))
    }
  }
}

const RegisterNewUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default RegisterNewUser