import { connect } from 'react-redux'
import Chat from '../components/Chat'
import { CHAT_VIEWS } from '../constants'

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

const ChatView = connect(
  mapStateToProps
)(Chat)

export default ChatView