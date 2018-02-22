import React from 'react'
import {Card, CardHeader} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import ChatWithInterlocutor from './ChatWithInterlocutor'
import ProceedInvitationAnswer from '../containers/ProceedInvitationAnswer'
import PropTypes from 'prop-types'
import { CHAT_VIEWS } from '../constants'

const interactorPanelStyle = {
  width: 'calc(66% - 10px)'
}

export default function Chat({view, interactor, invitation}) {
  switch(view) {
    case CHAT_VIEWS.CHAT_WITH_USER:
      return <ChatWithInterlocutor interlocutor={interactor} />
    case CHAT_VIEWS.SHOW_PENDING_STATE:
      return (
        <Card style={interactorPanelStyle}>
          <CardHeader
            title={interactor.name}
            subtitle="Wait until user accept invitation..."
            avatar={interactor.avatar}
          />
          <Divider />
        </Card>
      )
    case CHAT_VIEWS.SHOW_INVITATION:
      return <ProceedInvitationAnswer interactor={interactor} invitation={invitation} />
    case CHAT_VIEWS.SHOW_FALLBACK:
    default:
      return <Card style={interactorPanelStyle} />
  }
}

Chat.propTypes = {
  view: PropTypes.string,
  interactor: PropTypes.object,
  invitation: PropTypes.object
}