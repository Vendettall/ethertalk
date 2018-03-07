import { call, put, select, takeEvery } from 'redux-saga/effects'
import { FETCH_USER_REQUEST, REGISTER_USER_REQUEST, SEARCH_USER_REQUEST } from '../constants'
import { push } from 'react-router-redux'
import { setSocketRequest, addNotification, fetchInvitationsRequest, fetchContactsRequest,
  fetchUserSuccess, fetchUserError, registerUserSuccess, registerUserError, searchUserSuccess,
  searchUserError } from '../actions'
import imageFromHash from '../utils/imageFromHash'
import imageToHash from '../utils/imageToHash'
import convertToStateUser from '../utils/convertToStateUser'

// -> FETCH USER
function getStateUser (api, apiAccount) {
  return convertToStateUser(api, apiAccount.user)
    .then(stateUser => { 
        return { 
          stateUser: {
            ...stateUser,
            apiUser: apiAccount.user,
            walletId: apiAccount.id
          }
        }
    })
    .catch(error => ({ error }))
}

function* fetchUser ({ payload }) {
  let { api, account } = payload

  if (account) {
    yield put(push('/'))   
    let { stateUser, error } = yield call(getStateUser, api, account.apiAccount)

    if (stateUser) {
      let apiUser = stateUser.apiUser
      yield put(fetchUserSuccess(stateUser))
      yield put(setSocketRequest(apiUser))
      yield put(fetchInvitationsRequest(api, apiUser))
      yield put(fetchContactsRequest(api, apiUser))
    } else {
      console.log(`User wasn't got. ${error}`)
      yield put(addNotification('User wasn\'t got'))
      yield put(fetchUserError(error))
    }
  } else {
    yield put(push('/registration'))
    yield put(fetchUserError('No user'))
  }
}
// <- FETCH USER

// -> REGISTER USER
function resolveRegisterUser (api, account) {
  return api.UserRegistry.instance().register() // register user by api
    .then(apiUser => {
      account.user = apiUser
      return ({ apiUser })
    })
    .catch(error => ({ error }))
}

function setUserProfile (api, apiUser, name, avatarAsFile) {
  return imageToHash(api, avatarAsFile) 
    // set hash as avatar in api profile, but get it as bas64 image for state
      .then(hash => {
        return imageFromHash(api, hash)
          .then(image => {
            let avatar = image
            return apiUser.setProfile(name, hash)
              .then(success => ({ success, avatar }))
              .catch(error => ({ error }))
          })
      })
}

function* registerUser ({ payload }) {
  let { api, account, name, avatarAsFile } = payload
  let { apiUser, error } = yield call(resolveRegisterUser, api, account) 

  if (apiUser) {
    let { success, avatar, error } = yield call(setUserProfile, api, apiUser, name, avatarAsFile)
    if (success) {
      let walletId = account.id
      yield put(registerUserSuccess(apiUser, name, avatar, walletId))
      yield put(setSocketRequest(api, apiUser))
      yield put(push('/'))
    } else {
      console.log(`Users profile wasn't set. ${error}`)
      yield put(addNotification('Users profile wasn\'t set'))
      yield put(registerUserError(error))
    }
  } else {
    console.log(`User wasn't registered. ${error}`)
    yield put(addNotification('User wasn\'t registered'))
    yield put(registerUserError(error))
  }
}
// <- REGISTER USER

// -> SEARCH USER

function getUser (api, text) {
  return api.UserRegistry.instance().getUser(text)
    .then(user => ({ user }))
    .catch(error => ({ error }))
}

function proceedInInvitations (invitations, userId) {
  let response = null
  Object.keys(invitations).forEach(invKey => {
    if (invitations[invKey].user.id === userId) {
      response = {}
      if (invitations[invKey].isMy === true)
        response.answer = 'You have already invited this user.'
      else
        response.answer = 'This user has already invited you.'
      response.stateUser = invitations[invKey].user
      return
    }
  })
  return response
}

function poceedInContacts (contacts, userId) {
  let response = null
  if (contacts.hasOwnProperty(userId)) {
    response = {
      answer: 'This user has already in your contacts.',
      stateUser: contacts[userId]
    }
  }
  return response
}

function* searchUser ({ payload }) {
  let { text } = payload
  let { user, general, invitations, contacts } = yield select()
  let api = general.api
  let walletId = user.walletId
  let response = {}
  
  if (text === walletId) // check if search adress isn't users one
    response.answer = 'It is you.'
  else {
    let { user, error } = yield call(getUser, api, text)

    if (user) {
      let inInvitations = proceedInInvitations(invitations, user.id) 
      // check if user in our invitations and return response if yes
      if (inInvitations)
        response = inInvitations
      else {
        let inContacts = poceedInContacts(contacts, user.id)
      // check if user in our contacts and return response if yes
        if (inContacts)
          response = inContacts
        else {
          let stateUser = yield call(convertToStateUser, api, user)
          response = {
            answer: 'You can invite this user.',
            stateUser: stateUser,
            apiUser: user
          }
        }
      }
    } else {
      console.log(`User not found. ${error}`)
      yield put(addNotification('User not found'))
      yield put(searchUserError(error))
      return
    }
  }

  yield put(searchUserSuccess(response))
}
// <- SEARCH USER

function* userSaga() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUser)
  yield takeEvery(REGISTER_USER_REQUEST, registerUser)
  yield takeEvery(SEARCH_USER_REQUEST, searchUser)
}

export default userSaga