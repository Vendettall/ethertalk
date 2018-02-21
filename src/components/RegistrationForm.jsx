import React from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'

export default function RegistrationForm({api, account, name, avatar, onUpdateName, onUpdateAvatar,
                                          emitUploadClick, onRegister}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'}}>
      <Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
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
            onClick={() => emitUploadClick()}
            value={avatar? 'Your avatar': ''} 
          />
          <input 
            id="upload_avatar"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => onUpdateAvatar(e.target.files)}
            style={{display: 'none'}}
          />
        </CardText>
        <CardActions>
          <RaisedButton 
            label="Register Me"
            primary={true}
            onClick={() => onRegister(api, account, name, avatar)}
            style={{marginLeft: '10px'}}
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
  avatar: PropTypes.array,
  onUpdateName: PropTypes.func,
  onUpdateAvatar: PropTypes.func,
  emitUploadClick: PropTypes.func,
  onRegister: PropTypes.func
}