import React from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

export default function RegistrationForm({id, name, avatar, updateName, updateAvatar, emitUploadClick, register}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'}}>
      <Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
        <CardTitle title="Registration form" />
        <CardText>
          <TextField 
            hintText="Enter your name"
            onChange={(e, text) => updateName(text)}
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
            onChange={(e) => updateAvatar(e.target.files)}
            style={{display: 'none'}}
          />
        </CardText>
        <CardActions>
          <RaisedButton 
            label="Register Me"
            primary={true}
            onClick={() => register(id, name, avatar)}
            style={{marginLeft: '10px'}}
            disabled={!name || !avatar}
          />
        </CardActions>
      </Card>
    </div>
  )
}