import { connect } from 'react-redux'
import { addMessage, updateMessageText, wipeMessageText, showMessageHistory,
         updateApiInterlocutor } from '../actions/messages'
import Storage from '../utils/storage'
import formatDate from '../utils/formatDate'
import Messages from '../components/Messages'

function updateMessageHistory(interlocutorId, dispatch) {
  let messages = Storage.get(interlocutorId.toString())
  dispatch(showMessageHistory(messages || []))
  return
}

function updateInterlocutorApi(pubKeys, interlocutorId, dispatch) {
  let apiInterlocutor = Object.keys(pubKeys).find(key => pubKeys[key].id = interlocutorId)
  dispatch(updateApiInterlocutor(apiInterlocutor))
  return
}

function updateGetMessage(interlocutorId, socket, pubKeys, dispatch) {
  socket.on('message', apiMessage => {
    if (pubKeys[apiMessage.from].id === interlocutorId)
      dispatch(addMessage(convertToNewMessage(apiMessage.text, false)))
  })
  return
}

function updateInterlocutorInfo(interlocutorId, socket, pubKeys, dispatch) {
  updateMessageHistory(interlocutorId, dispatch)
  updateInterlocutorApi(pubKeys, interlocutorId, dispatch)
  updateGetMessage(interlocutorId, socket, pubKeys, dispatch)
}

function convertToNewMessage(text, isMy) {
  return {
    text: text,
    isMy: isMy,
    date: formatDate(new Date())
  }
}

function saveMessageToStorage(interlocutorId, isMy, message) {
  let messages = Storage.get(interlocutorId.toString()) || []
  Storage.set(interlocutorId.toString(), [...messages, convertToNewMessage(message, isMy)])
  return
}

function proceedMyMessage(socket, apiInterlocutor, message, dispatch) {
  socket.sendMessage(apiInterlocutor, message)
  saveMessageToStorage(apiInterlocutor.id, true, message)
  dispatch(addMessage(convertToNewMessage(message, true)))
  return
}

const mapStateToProps = (state, ownProps) => {
  return {
    socket: state.general.socket,
    pubKeys: state.pubKeys,
    currentUserAvatar: state.currentUser.avatar,
    interlocutor: ownProps.interlocutor,
    apiInterlocutor: state.messages.apiInterlocutor,
    text: state.messages.text,
    messages: state.messages.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateText: text => dispatch(updateMessageText(text)),
    onSend: (socket, apiInterlocutor, text) => {
      proceedMyMessage(socket, apiInterlocutor, text, dispatch)
      dispatch(wipeMessageText())
    },
    onNewInterlocutor: (interlocutorId, socket, pubKeys) => 
      updateInterlocutorInfo(interlocutorId, socket, pubKeys, dispatch)
  }
}

const ShowMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)

export default ShowMessages