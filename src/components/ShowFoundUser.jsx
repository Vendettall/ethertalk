import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader} from 'material-ui/Card'
import PropTypes from 'prop-types'

const styles = {
  foundUserContainer: {
    marginTop: '40px'
  }
}

function ShowFoundUser({stateUser, apiUser, answer, onInvite}) {
  let buttons = null
  
  if (answer === 'You can invite this user.') {
    buttons = (
      <CardActions>
        <FlatButton 
          label="Invite"
          onClick={() => onInvite(apiUser)}
        />
      </CardActions>
    )
  }

  return (
    <Card style={styles.foundUserContainer}>
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
  stateUser: PropTypes.object,
  apiUser: PropTypes.object,
  answer: PropTypes.string,
  onInvite: PropTypes.func
}

export default ShowFoundUser