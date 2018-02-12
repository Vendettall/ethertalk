import React from 'react'
import {Card, CardHeader} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDone from 'material-ui/svg-icons/action/done'
import ContantClear from 'material-ui/svg-icons/content/clear'
import {lightGreen400, red400, grey400} from 'material-ui/styles/colors'

export default function ShowInvitation({general, user, invitationId, onAccept, onReject}) {
  return (
    <Card style={{width: 'calc(66% - 10px)'}}>
      <CardHeader title={user.name} subtitle={`User ${user.name} want to talk with you.`} avatar={user.avatar}>
        <IconButton tooltip="Accept" onClick={() => onAccept(general, user, invitationId)}>
          <ActionDone color={grey400} hoverColor={lightGreen400} />
        </IconButton>
        <IconButton tooltip="Decline" onClick={() => onReject(general, invitationId)}>
          <ContantClear color={grey400} hoverColor={red400} />
        </IconButton>
      </CardHeader>
      <Divider />
    </Card>
  )
}