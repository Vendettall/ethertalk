import { connect } from 'react-redux'
import App from '../App'

// socket.on('message', (message) => {
//   getMessage()
// })

// function getMessage(apiMessage, pubKeys) {
//   let interlocutorId = pubKeys[apiMessage.from]
//   Storage.set(interlocutorId, {
//     text: apiMessage.message,
//     isMy: false,
//     date: formatDate(apiMessage.sent)
//   })
//   return
// }

// function updateGetMessage(interlocutorId, socket, pubKeys, dispatch) {
//   socket.on('message', apiMessage => {
//     if (pubKeys[apiMessage.from].id === interlocutorId)
//       dispatch(addMessage(convertToNewMessage(apiMessage.text, false)))
//   })
//   return
// }

const mapStateToProps = state => {
  return {
    user: state.currentUser
  }
}

const StartApp = connect(
  mapStateToProps
)(App)

export default StartApp