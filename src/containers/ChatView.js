import { connect } from 'react-redux'
import Chat from '../components/Chat'

const mapStateToProps = state => {
  let user, invitationId
  switch(state.chatView.view) {
    case 'SHOW_INVITATION':
    case 'SHOW_PENDING_STATE':
      user = state.invitations[state.chatView.id.toString()].user
      invitationId = state.invitations[state.chatView.id.toString()].id
      break
    case 'CHAT_WITH_USER':
      user = state.contacts[state.chatView.id.toString()]
      break;
    case 'SHOW_FALLBACK':
    default: 
      user = null
  }
  return {
    view: state.chatView.view,
    user: user,
    invitationId: invitationId
  }
}

const ChatView = connect(
  mapStateToProps
)(Chat)

export default ChatView