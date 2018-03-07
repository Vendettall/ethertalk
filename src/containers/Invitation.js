import React from 'react'
import { connect } from 'react-redux'
import { acceptInvitation, rejectInvitation } from '../actions'
import {Card, CardHeader} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDone from 'material-ui/svg-icons/action/done'
import ContentClear from 'material-ui/svg-icons/content/clear'
import {lightGreen400, red400, grey400} from 'material-ui/styles/colors'
import PropTypes from 'prop-types'

const styles = {
  interactorPanel: {
    width: 'calc(66% - 10px)'
  },
  acceptIcon: {
    color: grey400,
    hoverColor: lightGreen400
  },
  rejectIcon: {
    color: grey400,
    hoverColor: red400
  }
}

function InvitationView({interactor, invitation, onAccept, onReject}) {
  return (
    <Card style={styles.interactorPanel}>
      <CardHeader
        title={interactor.name}
        subtitle={`User ${interactor.name} want to talk with you.`}
        avatar={interactor.avatar}
      >
        <IconButton
          tooltip="Accept"
          onClick={() => onAccept(interactor, invitation)}
        >
          <ActionDone color={styles.acceptIcon.color} hoverColor={styles.acceptIcon.hoverColor} />
        </IconButton>
        <IconButton 
          tooltip="Decline"
          onClick={() => onReject(invitation)}
        >
          <ContentClear color={styles.rejectIcon.color} hoverColor={styles.rejectIcon.hoverColor} />
        </IconButton>
      </CardHeader>
      <Divider />
    </Card>
  )
}

InvitationView.propTypes = {
  interactor: PropTypes.object,
  invitation: PropTypes.object,
  onAccept: PropTypes.func,
  onReject: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    interactor: ownProps.interactor,
    invitation: ownProps.invitation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAccept: (interactor, invitation) => dispatch(acceptInvitation(invitation, interactor)),
    onReject: invitation => dispatch(rejectInvitation(invitation))
  }
}

const Invitation = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitationView)

export default Invitation