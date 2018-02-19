import { connect } from 'react-redux'
import Chat from '../components/Chat'

const mapStateToProps = state => {
  let interlocutor, invitation
  switch(state.chatView.view) {
    case 'SHOW_INVITATION':
    case 'SHOW_PENDING_STATE':
      interlocutor = state.invitations[state.chatView.id.toString()].user
      invitation = state.invitations[state.chatView.id.toString()]
      break
    case 'CHAT_WITH_USER':
      interlocutor = state.contacts[state.chatView.id.toString()]
      break;
    case 'SHOW_FALLBACK':
    default: 
      interlocutor = null
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