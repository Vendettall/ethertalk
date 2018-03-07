import { eventChannel } from 'redux-saga'
import { call, put, take, select, takeEvery } from 'redux-saga/effects'
import { REGISTER_USER_SUCCESS, FETCH_USER_SUCCESS } from "../constants"
import { addInvitationRequest, updateUserChannel } from '../actions'


function userEventsChannel (user) {
  return eventChannel(emitter => {
    user.on('invitationReceived', apiInvitation => {
      return emitter(addInvitationRequest(apiInvitation, false))
    })
    return () => {
      user.removeListener('invitationReceived', apiInvitation => {
        return emitter(addInvitationRequest(apiInvitation, false))
      })
    }
  })
}

function* proccedPrevChannel () {
  let { channels } = yield select()
  let userChannel = channels.userChannel

  if (userChannel)
    userChannel.close()
}

function* setupUserEventsHandler (user) {
  let userChannel = yield call(userEventsChannel, user)
  yield call(proccedPrevChannel)
  yield put(updateUserChannel(userChannel))

  while (true) {
    let action = yield take(userChannel)
    yield put(action)
  }
}

function* proceedFetchUser ({ payload }) {
  let { user } = payload
  yield call(setupUserEventsHandler, user.apiUser)
}

function* proceedRegisterUser ({ payload }) {
  let { apiUser } = payload
  yield call(setupUserEventsHandler, apiUser)
}

function* userEventsSaga() {
  yield takeEvery(FETCH_USER_SUCCESS, proceedFetchUser)
  yield takeEvery(REGISTER_USER_SUCCESS, proceedRegisterUser)
}


export default userEventsSaga