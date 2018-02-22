import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader} from 'material-ui/Card'
import PropTypes from 'prop-types'

const foundUserContainerStyle = {
  marginTop: '40px'
}

export default function ShowFoundUser({currentApiUser, stateUser, apiUser, answer, onInvite}) {
  let buttons = null
  
  if (answer === 'You can invite this user.') {
    buttons = (
      <CardActions>
        <FlatButton 
          label="Invite"
          onClick={() => onInvite(currentApiUser, apiUser)}
        />
      </CardActions>
    )
  }

  return (
    <Card style={foundUserContainerStyle}>
      <CardHeader
        title={stateUser.name}
        subtitle={answer}
        avatar={stateUser.avatar}
      />
      {buttons}
    </Card>
  )
}

ShowFoundUser.propTypes = {
  currentApiUser: PropTypes.object,
  stateUser: PropTypes.object,
  apiUser: PropTypes.object,
  answer: PropTypes.string,
  onInvite: PropTypes.func
}