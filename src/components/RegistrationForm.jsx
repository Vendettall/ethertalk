import React from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh'
}

const wrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
}

const uploadInputStyle = {
  display: 'none'
}

const registrationButtonStyle = {
  marginLeft: '10px'
}

export default function RegistrationForm({api, account, name, avatar, onUpdateName, onUpdateAvatar,
                                          emitUploadClick, onRegister}) {
  let uploadAvatarRef = null
  return (
    <div style={containerStyle}>
      <Card style={wrapperStyle}>
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
            value={avatar? avatar['0'].name: ''} 
          />
          <input 
            ref={ref => uploadAvatarRef = ref}
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => onUpdateAvatar(e.target.files)}
            style={uploadInputStyle}
          />
        </CardText>
        <CardActions>
          <RaisedButton 
            label="Register Me"
            primary={true}
            onClick={() => onRegister(api, account, name, avatar['0'])}
            style={registrationButtonStyle}
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
  avatar: PropTypes.object,
  onUpdateName: PropTypes.func,
  onUpdateAvatar: PropTypes.func,
  emitUploadClick: PropTypes.func,
  onRegister: PropTypes.func
}