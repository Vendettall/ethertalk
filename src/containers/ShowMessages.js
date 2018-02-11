import { connect } from 'react-redux'
import { addMessage, updateMessageText } from '../actions/messages'
import Messages from '../components/Messages'

const mapStateToProps = state => {
  return {
    avatar: state.currentUser.avatar,
    text: state.messages.text,
    messages: state.messages.messages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateText: text => {
      dispatch(updateMessageText(text))
    },
    onSend: (text, avatar) => {
      dispatch(addMessage(text, avatar))
      dispatch(updateMessageText(''))
    }
  }
}

const ShowMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)

export default ShowMessages