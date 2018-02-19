import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader} from 'material-ui/Card'

export default function ShowFoundUser({currentApiUser, stateUser, apiUser, answer, onInvite}) {
  let buttons = null
  
  if (answer === 'You can invite this user.') {
    buttons = (
      <CardActions>
        <FlatButton label="Invite" onClick={() => onInvite(currentApiUser, apiUser)} />
      </CardActions>
    )
  }

  return (
    <Card style={{marginTop: '40px'}}>
      <CardHeader title={stateUser.name} subtitle={answer} avatar={stateUser.avatar} />
      {buttons}
    </Card>
  )
}