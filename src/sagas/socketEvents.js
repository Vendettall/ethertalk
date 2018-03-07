import { eventChannel, END } from 'redux-saga'
import { call, put, take, takeEvery } from 'redux-saga/effects'
import { SET_SOCKET_SUCCESS } from '../constants'
import { addNotification, getApiMessage } from '../actions'

function socketEventsChannel (socket) {
  return eventChannel(emitter => {
    socket.on('started', () => {
      console.log('Socket opened')
    })
    socket.on('error', error => {
      console.log(`Socket error. ${error}`)
      return emitter(addNotification('Socket error'))
    })
    socket.on('stopped', () => {
      console.log('Socket closed')
      return emitter(END)
    })
    socket.on('message', apiMessage => {
      return emitter(getApiMessage(apiMessage))
    })
    return () => {
      socket.removeListener('started', () => {
        console.log('Socket opened')
      })
      socket.removeListener('error', error => {
        console.log(`Socket error. ${error}`)
        return emitter(addNotification('Socket error'))
      })
      socket.removeListener('stopped', () => {
        console.log('Socket closed')
        return emitter(END)
      })
      socket.removeListener('message', apiMessage => {
        return emitter(getApiMessage(apiMessage))
      })
    }
  })
}

function* setupSocketEventsHandler ({ payload }) {
  let { socket } = payload
  let socketChannel = yield call(socketEventsChannel, socket)

  while (true) {
    let action = yield take(socketChannel)
    yield put(action)
  }
}

function* socketEventsSaga() {
  yield takeEvery(SET_SOCKET_SUCCESS, setupSocketEventsHandler)
}

export default socketEventsSaga