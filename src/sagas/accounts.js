import { call, all, put, select, takeEvery } from 'redux-saga/effects'
import { FETCH_ACCOUNTS_REQUEST, CHANGE_ACCOUNT } from '../constants'
import { addNotification, fetchAccountsSuccess, fetchAccountsError, setAccount,
  fetchUserRequest } from '../actions'

// -> FETCH ACCOUNTS
function getApiAccounts (api) {
  return api.Accounts.instance().getAccounts()
    .then(apiAccounts => ({ apiAccounts }))
    .catch(error => ({ error }))
}

function getName (user) {
  return user.getProfile()
    .then(profile => ({ name: profile[0] }))
    .catch(error => ({ error }))
}

function getNamesPromises (apiAccounts) {
  return apiAccounts.map(account => { 
    if (account.user)
      return call(getName, account.user)
    return null
  })
}

function* proceedNameResult (result) {
  let { name, error } = result

  if (name)
    return name
  else {
    console.log(`User name wasn't got. Error: ${error}`)
    yield put(addNotification('User name wasn\'t got'))
    return null
  }
}

function getStateAccounts (names, apiAccounts) {
  let startedAccount = null
  let stateAccounts = names.map((name, index) => {
    let stateAccount = {
      apiAccount: apiAccounts[index],
      userName: name
    }

    if (!startedAccount && name) // if we will find user, we will choose him automatically
      startedAccount = stateAccount

    return stateAccount
  })

  return ({ stateAccounts, startedAccount })
}

function* fetchAccounts ({ payload }) {
  let { api } = payload
  let { apiAccounts, error } = yield call(getApiAccounts, api)

  if (apiAccounts) {
    let namesPromises = yield call(getNamesPromises, apiAccounts) // we will show userNames in accounts list
    let namesResults = yield all([...namesPromises]) 
    let names = yield all(namesResults.map(result => call(proceedNameResult, result)))
    let { stateAccounts, startedAccount } = yield call(getStateAccounts, names, apiAccounts) // started account -- account with user
    yield put(fetchAccountsSuccess(stateAccounts, startedAccount))
    yield put(fetchUserRequest(api, startedAccount))
  } else {
    console.log(`Accounts wasn't got. Error: ${error}`)
    yield put(addNotification('Accounts wasn\'t got'))
    yield put(fetchAccountsError(error))
  }
}
// <- FETCH ACCOUNTS

// -> CHANGE ACCOUNT
function* changeAccount ({ payload }) {
  let { account } = payload
  let { general } = yield select()
  yield put(fetchUserRequest(general.api, account))
  yield put(setAccount(account))
}
// <- CHANGE ACCOUNT

function* accountsSaga () {
  yield takeEvery(FETCH_ACCOUNTS_REQUEST, fetchAccounts)
  yield takeEvery(CHANGE_ACCOUNT, changeAccount)
}

export default accountsSaga