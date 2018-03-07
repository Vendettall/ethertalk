import React from 'react'
import { connect } from 'react-redux'
import {Card, CardHeader} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import ChatWithInterlocutor from '../components/ChatWithInterlocutor'
import Invitation from './Invitation'
import PropTypes from 'prop-types'
import { CHAT_VIEWS } from '../constants'


const styles = {
  interactorPanel: {
    width: 'calc(66% - 10px)'
  }
}

function ChatView({view, interactor, invitation}) {
  switch(view) {
    case CHAT_VIEWS.CHAT_WITH_USER: // after click on contact
      return <ChatWithInterlocutor interlocutor={interactor} />
    case CHAT_VIEWS.SHOW_PENDING_STATE: // after click on send invitation
      return (
        <Card style={styles.interactorPanel}>
          <CardHeader
            title={interactor.name}
            subtitle="Wait until user accept invitation..."
            avatar={interactor.avatar}
          />
          <Divider />
        </Card>
      )
    case CHAT_VIEWS.SHOW_INVITATION: // after click on inboc invitation
      return <Invitation interactor={interactor} invitation={invitation} />
    case CHAT_VIEWS.SHOW_FALLBACK: // in all other cases
    default:
      return <Card style={styles.interactorPanel} />
  }
}

ChatView.propTypes = {
  view: PropTypes.string,
  interactor: PropTypes.object,
  invitation: PropTypes.object
}

const mapStateToProps = state => {
  let interactor = null
  let invitation = null
  let view = state.chatView.view

  switch (view) {
    case CHAT_VIEWS.CHAT_WITH_USER: {
      interactor = state.chatView.interactor
      break
    }
    case CHAT_VIEWS.SHOW_PENDING_STATE:
    case CHAT_VIEWS.SHOW_INVITATION: {
      interactor = state.chatView.interactor.user
      invitation = state.chatView.interactor
      break
    }
    default:
  }

  return {
    view: state.chatView.view,
    interactor: interactor,
    invitation: invitation
  }
}

const Chat = connect(mapStateToProps)(ChatView)


export default Chat