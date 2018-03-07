import { put, takeEvery } from 'redux-saga/effects'
import { addPendingTask, removePendingTask } from '../actions'


function* addTask () {
  yield put(addPendingTask())
}

function* removeTask () {
  yield put(removePendingTask())
}

function* spinnerSaga() {
  yield takeEvery(action => /_REQUEST$/.test(action.type), addTask)
  yield takeEvery(action => /_SUCCESS$/.test(action.type), removeTask)
  yield takeEvery(action => /_ERROR$/.test(action.type), removeTask)
}


export default spinnerSaga