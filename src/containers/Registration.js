import React from 'react'
import { connect } from 'react-redux'
import { registerUser, updateRegistrationName, updateRegistrationAvatar } from '../actions'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import Accounts from './Accounts'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  uploadInput: {
    display: 'none'
  },
  registrationButton: {
    marginLeft: '10px'
  }
}

function RegistrationForm({api, account, name, avatar, onUpdateName, onUpdateAvatar,
                           emitUploadClick, onRegister}) {
  let uploadAvatarRef = null
  return (
    <div style={styles.container}>
      <Accounts />
      <Card style={styles.wrapper}>
        <CardTitle title="Registration form" />
        <CardText>
          <TextField 
            hintText="Enter your name"
            onChange={(e, text) => onUpdateName(text)}
            value={name} 
          />
          <br />
          <TextField 
            hintText="Upload your avatar"
            onClick={() => emitUploadClick(uploadAvatarRef)}
            // emit click on input below, just for better view
            value={avatar? avatar['0'].name: ''} 
          />
          <input // input which get our avatars
            ref={ref => uploadAvatarRef = ref}
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => onUpdateAvatar(e.target.files)}
            style={styles.uploadInput}
          />
        </CardText>
        <CardActions>
          <RaisedButton 
            label="Register Me"
            primary={true}
            onClick={() => onRegister(api, account.apiAccount, name, avatar['0'])}
            style={styles.registrationButton}
            disabled={!name || !avatar}
          />
        </CardActions>
      </Card>
    </div>
  )
}

RegistrationForm.propTypes = {
  api: PropTypes.object,
  account: PropTypes.object,
  name: PropTypes.string,
  avatar: PropTypes.object,
  onUpdateName: PropTypes.func,
  onUpdateAvatar: PropTypes.func,
  emitUploadClick: PropTypes.func,
  onRegister: PropTypes.func
}

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

const Registration = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)

export default Registration