import { connect } from 'react-redux'
import Chat from '../components/Chat'

const mapStateToProps = state => {
  let interlocutor, invitationId
  switch(state.chatView.view) {
    case 'SHOW_INVITATION':
    case 'SHOW_PENDING_STATE':
      interlocutor = state.invitations[state.chatView.id.toString()].user
      invitationId = state.invitations[state.chatView.id.toString()].id
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
    invitationId: invitationId
  }
}

const ChatView = connect(
  mapStateToProps
)(Chat)

export default ChatView