import { call, put, select, takeEvery } from 'redux-saga/effects'
import { SEND_MESSAGE_REQUEST, GET_API_MESSAGE, CHAT_VIEWS, CHOOSE_CHAT_VIEW } from '../constants'
import { addNotification, getMessage, sendMessageSuccess, sendMessageError, setupNewChat } from '../actions'
import Storage from '../utils/storage'
import formatDate from '../utils/formatDate'


// -> SEND MESSAGE
function resolveSendMessage (socket, apiInterlocutor, text) {
  return socket.sendMessage(apiInterlocutor, text)
    .then(success => ({ success}))
    .catch(error => ({ error }))
}

function* sendMessage({ payload }) {
  let { socket, apiInterlocutor, text } = payload
  let message = { // convert to stateMessage
    text: text,
    isMy: true,
    date: formatDate(new Date())
  }
  let { success, error } = yield call(resolveSendMessage, socket, apiInterlocutor, text)

  if (success) {
    let messages = yield call(Storage.get, apiInterlocutor.id) || []
    yield call(Storage.set, apiInterlocutor.id, [...messages, message]) // add message to storage
    yield put(sendMessageSuccess(message))
  } else {
    console.log(`Message wasn't send. ${error}`)
    yield put(addNotification('Message wasn\'t send'))
    yield put(sendMessageError(error))
  }
}
// <- SEND MESSAGE

// -> GET API MESSAGE
function* getApiMessage({ payload }) {
  let { apiMessage } = payload
  let { pubKeys, messages } = yield select()
  let interlocutorId = pubKeys[apiMessage.from].id
  let apiInterlocutor = messages.apiInterlocutor
  let isCurrentInterlocutor = false
  let message = { // convert to stateMessage
    text: apiMessage.message,
    isMy: false,
    date: formatDate(apiMessage.sent)
  }

  messages = yield call(Storage.get, interlocutorId) || []
  yield (Storage.set, interlocutorId, [...messages, message]) // add message to storage

  if (apiInterlocutor && apiInterlocutor.id === interlocutorId)
    isCurrentInterlocutor = true

  yield put(getMessage(message, isCurrentInterlocutor))
}
// <- GET API MESSAGE

// -> GET MESSAGE HISTORY
function* getMessageHistory ({ payload }) {
  let { view, interactor } = payload

  if (view === CHAT_VIEWS.CHAT_WITH_USER) {
    let messages = yield call(Storage.get, interactor.id) || []
    yield put(setupNewChat(messages, interactor.apiUser))
  }
}
// <- GET MESSAGE HISTORY

function* messagesSaga() {
  yield takeEvery(SEND_MESSAGE_REQUEST, sendMessage)
  yield takeEvery(GET_API_MESSAGE, getApiMessage)
  yield takeEvery(CHOOSE_CHAT_VIEW, getMessageHistory)
}


export default messagesSaga