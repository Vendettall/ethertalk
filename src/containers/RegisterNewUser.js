import { connect } from 'react-redux'
import { updateUserName, updateUserAvatar } from '../actions/currentUser'
import { push } from 'react-router-redux'
import RegistrationForm from '../components/RegistrationForm'
import API from '../api'
import getWeb3 from '../utils/getWeb3'

function register(id, name, avatar, dispatch){
  console.log(id)
  getWeb3.then((web3) => {
    let api = API(web3)
    api.UserRegistry.instance().getUser(id).then((user) => {
      // TODO: bag
      user.setProfile(name, avatar)
      dispatch(push('/'))
      return
    })
  })
}

function updateAvatar(avatar, dispatch) {
  getWeb3.then((web3) => {
    // let api = API(web3)
    // TODO: bag
    // web3.bzz.upload(avatar).then((hash) => {
    // api.Swarm.instance().uploadFile(avatar).then((hash) => {
    //   console.log(hash, "HASH")
    //   dispatch(updateUserAvatar(hash))
    //   return
    // })
    dispatch(updateUserAvatar('avatar'))
  })
}

const mapStateToProps = state => {
  return {
    id: state.currentUser.id,
    avatar: state.currentUser.avatar,
    name: state.currentUser.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateName: name => {
      dispatch(updateUserName(name))
    },
    updateAvatar: avatar => updateAvatar(avatar['0'], dispatch),
    emitUploadClick: () => {
      document.getElementById('upload_avatar').click()
    },
    register: (id, name, avatar) => register(id, name, avatar)
  }
}

const RegisterNewUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default RegisterNewUser