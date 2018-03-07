import { call, put, select, takeEvery } from 'redux-saga/effects'
import getWeb3 from '../utils/getWeb3'
import API from '../api'
import { FETCH_API_REQUEST, SET_SOCKET_REQUEST } from '../constants'
import { addNotification, fetchAccountsRequest, fetchApiSuccess, fetchApiError,
  setSocketSuccess } from '../actions'

// -> FETCH API
function getApi () {
  return getWeb3
    .then(web3 => {
      return { api: API(web3) }
    })
    .catch(error => ({ error }))
}

function* fetchApi () {
  let { api, error } = yield call(getApi)
  if (api) {
    yield put(fetchApiSuccess(api))
    yield put(fetchAccountsRequest(api))
  } else {
    console.log(`Api wasn't got. Error: ${error}`)
    yield put(addNotification('Api wasn\'t got'))
    yield put(fetchApiError(error))
  }
}
// <- FETCH API

// -> SET SOCKET
function* setSocket({ payload }) {
  let { general } = yield select()
  let [ api, prevSocket ] = [ general.api, general.socket ]
  let { apiUser } = payload
  let socket = new api.Whisper(apiUser)

  if (prevSocket)
    prevSocket.stop()
  socket.start()
  
  yield put(setSocketSuccess(socket))
}
// <- SET SOCKET

function* generalSaga() {
  yield takeEvery(FETCH_API_REQUEST, fetchApi)
  yield takeEvery(SET_SOCKET_REQUEST, setSocket)
}

export default generalSaga