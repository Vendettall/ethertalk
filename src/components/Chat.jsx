import React from 'react'
import {Card, CardHeader} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import ChatWithUser from './ChatWithUser'
import ProceedInvitationAnswer from '../containers/ProceedInvitationAnswer'

export default function Chat({view, interlocutor, invitationId}) {
  switch(view) {
    case 'CHAT_WITH_USER':
      return <ChatWithUser interlocutor={interlocutor} />
    case 'SHOW_PENDING_STATE': {
      return (
        <Card style={{width: 'calc(66% - 10px)'}}>
          <CardHeader title={interlocutor.name} subtitle="Wait until user accept invitation..."
                      avatar={interlocutor.avatar} />
          <Divider />
        </Card>
      )
    }
    case 'SHOW_INVITATION': {
      return <ProceedInvitationAnswer interlocutor={interlocutor} invitationId={invitationId} />
    }
    case 'FALL_BACK':
    default:
      return <Card style={{width: 'calc(66% - 10px)'}} />
  }
}