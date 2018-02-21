import { connect } from 'react-redux'
import Chat from '../components/Chat'

const mapStateToProps = state => {
  let interlocutor = null
  let invitation = null
  let view = state.chatView.view
  switch (view) {
    case 'CHAT_WITH_USER': {
      interlocutor = state.chatView.interlocutor
      break
    }
    case 'SHOW_PENDING_STATE':
    case 'SHOW_INVITATION': {
      interlocutor = state.chatView.interlocutor.user
      invitation = state.chatView.interlocutor
      break
    }
    default:
  }
  return {
    view: state.chatView.view,
    interlocutor: interlocutor,
    invitation: invitation
  }
}

const ChatView = connect(
  mapStateToProps
)(Chat)

export default ChatView