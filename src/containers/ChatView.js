import { connect } from 'react-redux'
import Chat from '../components/Chat'

const mapStateToProps = state => {
  let user
  switch(state.chatView.view) {
    case 'SHOW_INVITATION':
    case 'SHOW_PENDING_STATE':
      user = state.invitations[state.chatView.id.toString()]
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
    user: user
  }
}

const ChatView = connect(
  mapStateToProps
)(Chat)

export default ChatView