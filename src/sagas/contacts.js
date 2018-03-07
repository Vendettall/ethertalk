import { call, put, all, takeEvery } from 'redux-saga/effects'
import { FETCH_CONTACTS_REQUEST, UPDATE_CONTACT_PROFILE_EVENT } from '../constants'
import { addNotification, fetchContactsSuccess, fetchContactsError,
  fetchPubKeysRequest, updateContactProfile } from '../actions'
import convertToStateUser from '../utils/convertToStateUser'


// -> FETCH CONTACTS
function getContacts (api, apiUser) {
  return apiUser.getContacts()
    .then(apiContacts => ({ apiContacts }))
    .catch(error => ({ error }))
} 

function getContactsUsers (api, contacts) {
  return contacts.map(inv => {
    return inv.getUser()
      .then(contactUser => ({ contactUser }))
      .catch(error => ({ error }))
    })
}

function* proceedContactUserResult (result) {
  let { contactUser, error } = result

  if (contactUser)
    return contactUser
  else {
    console.log(`Contact user wasn't got. ${error}`)
    yield put(addNotification('Contact user wasn\'t got'))
    return null
  }
}

function getContact (api, user) {
  return convertToStateUser(api, user)
    .then(contact => ({ contact }))
    .catch(error => ({ error }))
}

function* getContactsPromises (api, contacts) {
  if (contacts.length) {
    let contactsUsersPromises = yield call(getContactsUsers, api, contacts)
    let contactsUsers = yield all([...contactsUsersPromises])
    let contactsUsersResults = yield all(contactsUsers.map(result => call(proceedContactUserResult, result)))

    return contacts.map((contact, index) => {
      return call(getContact, api, contact, contactsUsersResults[index])
    })
  }

  return []
}

function proceedContactResult (result) {
  let { contact, error } = result

  if (contact)
    return contact
  else {
    console.log(`Contact wasn't got. ${error}`)
    put(addNotification('Contact wasn\'t got'))
    return null
  }
}

function getStateContacts (contacts) {
  if (!contacts.length) return {}
  return contacts.reduce((obj, contact) => {
    obj[contact.id] = contact
    return obj
  }, {})
}


function* fetchContacts ({ payload }) {
  let { api, apiUser } = payload
  let { apiContacts, error } = yield call(getContacts, api, apiUser)
  if (apiContacts) {
    let contactsPromises = yield call(getContactsPromises, api, apiContacts)
    let contactsResults = yield all([...contactsPromises]) 
    let contacts = yield all(contactsResults.map(result => call(proceedContactResult, result)))
    let stateContacts = yield call(getStateContacts, contacts)
    yield put(fetchContactsSuccess(stateContacts))
    yield put(fetchPubKeysRequest(stateContacts))
  } else {
    console.log(`Contacts wasn't got. ${error}`)
    yield put(addNotification('Contacts wasn\'t got'))
    yield put(fetchContactsError(error))
  }
}
// <- FETCH CONTACTS

// -> UPDATE CONTACT PROFILE
function getContactProfile (contact) {
  contact.getProfile()
    .then(contactProfile => ({ contactProfile }))
    .catch(error => ({ error }))
}

function* updateProfile (contact) {
  let { contactProfile, error } = yield call(getContactProfile, contact)

  if (contactProfile) {
    yield put(updateContactProfile(contact.id, contactProfile))
  } else {
    console.log(`Contact profile wasn't got. ${error}`)
    yield put(addNotification('Contact profile wasn\'t got.'))
  }
}
// <- UPDATE CONTACT PROFILE

function* contactsSaga() {
  yield takeEvery(FETCH_CONTACTS_REQUEST, fetchContacts)
  yield takeEvery(UPDATE_CONTACT_PROFILE_EVENT, updateProfile)
}


export default contactsSaga