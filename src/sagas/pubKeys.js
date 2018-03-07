import { call, put, all, select, takeEvery } from 'redux-saga/effects'
import { FETCH_PUBKEYS_REQUEST, UPDATE_PUBKEY_REQUEST } from '../constants'
import { addNotification, fetchPubKeysSuccess, updatePubKeySuccess, updatePubKeyError } from '../actions'


// -> FETCH PUBKEYS
function getApiContacts (contacts) {
  return Object.keys(contacts).map(key => {
      return contacts[key].apiUser
  })
}

function getPubKey (apiUser) {
  return apiUser.getPubKey()
    .then(pubKey => ({ pubKey }))
    .catch(error => ({ error }))
}

function getPubKeysPromises (apiContacts) {
  return apiContacts.map(apiUser => {
    return call(getPubKey, apiUser)
  })
}

function* proceedApiPubKeyResult (result) {
  let { pubKey, error } = result

  if (pubKey)
    return pubKey
  else {
    console.log(`Public key wasn't got. ${error}`)
    yield put(addNotification('Public key wasn\'t got'))
    return null
  }
}

function getStatePubKeys (apiPubKeys, apiContacts) {
  return apiPubKeys.reduce((obj, pubKey, index) => {
    obj[pubKey] = apiContacts[index]
    return obj
  }, {})
}

function* fetchPubKeys({ payload }) {
  let { contacts } = payload
  let apiContacts = yield call(getApiContacts, contacts)
  let pubKeysPromises = yield call(getPubKeysPromises, apiContacts)
  let apiPubKeysResults = yield all([...pubKeysPromises])
  let apiPubKeys = yield all(apiPubKeysResults.map(result => call(proceedApiPubKeyResult, result)))
  let pubKeys = yield call(getStatePubKeys, apiPubKeys, apiContacts)
  yield put(fetchPubKeysSuccess(pubKeys))
}
// <- FETCH PUBKEYS

// -> UPDATE PUBKEY
function* updatePubKey (apiUser) {
  let { pubKeys } = yield select()
  let { pubKey: newPubKey, error } = yield call(getPubKey, apiUser)

  if (newPubKey) {
    let oldPubKey = Object.keys(pubKeys).find(pubKey => apiUser.id === pubKeys[pubKey].id)
    yield put(updatePubKeySuccess(newPubKey, oldPubKey))
  } else {
    console.log(`New public key wasn't got. ${error}`)
    yield put(addNotification('New public key wasn\'t got'))
    yield put(updatePubKeyError(error))
  }
}
// <- UPDATE PUBKEY

function* messagesSaga() {
  yield takeEvery(FETCH_PUBKEYS_REQUEST, fetchPubKeys)
  yield takeEvery(UPDATE_PUBKEY_REQUEST, updatePubKey)
}


export default messagesSaga