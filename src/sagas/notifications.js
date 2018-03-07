import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { ADD_NOTIFICATION } from '../constants'
import { removeNotification } from '../actions'

// -> REMOVE NOTIFICATION
function* proceedNotification ({ payload }) {
  let { id } = payload
  yield delay(5000)
  yield put(removeNotification(id))
}
// <- REMOVE NOTIFICATION

function* notificationsSaga() {
  yield takeEvery(ADD_NOTIFICATION, proceedNotification)
}

export default notificationsSaga