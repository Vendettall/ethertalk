import { connect } from 'react-redux'
import { sendMessage, updateMessageText } from '../actions'
import Messages from '../components/Messages'

const mapStateToProps = (state, ownProps) => {
  return {
    socket: state.general.socket,
    userAvatar: state.user.avatar,
    interlocutor: ownProps.interlocutor,
    text: state.messages.text,
    messages: state.messages.messages,
    messageWrapperRef: state.messages.messageWrapperRef
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateText: text => dispatch(updateMessageText(text)),
    onSend: (socket, apiInterlocutor, text) => 
      dispatch(sendMessage(socket, apiInterlocutor, text))
  }
}

const ShowMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)

export default ShowMessages