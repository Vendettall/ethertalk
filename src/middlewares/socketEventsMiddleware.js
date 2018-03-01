import { SET_SOCKET } from '../constants'
import { getMessage } from '../actions'

export const socketMiddleware = store => next => action => {
  // setup handlers
  const setupSocketHandler = socket => {
    socket.on('started', () => {
      console.log('Socket opened')
    })
    socket.on('error', error => {
      console.log('Socket error ', error)
    })
    socket.on('stopped', () => {
      console.log('Socket closed')
    })
    socket.on('message', apiMessage => {
      let state = store.getState()
      let pubKeys = state.pubKeys
      let currentInterlocutorId = null
      if (state.messages.apiInterlocutor)
        currentInterlocutorId = state.messages.apiInterlocutor.id
      store.dispatch(getMessage(apiMessage, pubKeys, currentInterlocutorId))
    })
  }
  // remove handlers
  const removeSocketHandler = socket => {
    socket.removeListener('started', () => {
      console.log('Socket opened')
    })
    socket.removeListener('error', error => {
      console.log('Socket error ', error)
    })
    socket.removeListener('stopped', () => {
      console.log('Socket closed')
    })
    socket.removeListener('message', apiMessage => {
      let state = store.getState()
      let pubKeys = state.pubKeys
      let currentInterlocutorId = state.messages.apiInterlocutor.id
      store.dispatch(getMessage(apiMessage, pubKeys, currentInterlocutorId))
    })
  }
  //
  if (action.type === SET_SOCKET) {
    let prevSocket = store.getState().general.socket

    if (prevSocket)
      removeSocketHandler(prevSocket)
    setupSocketHandler(action.socket)
  }

  return next(action)
}