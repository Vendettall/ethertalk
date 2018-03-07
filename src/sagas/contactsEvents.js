import { eventChannel, END } from 'redux-saga'
import { call, put, take, all, select, takeEvery } from 'redux-saga/effects'
import { FETCH_CONTACTS_SUCCESS, ADD_CONTACT } from "../constants"
import { updatePubKeyRequest, deleteContact, updateContactProfileEvent,
  addContactChannel, removeContactsChannels } from '../actions'


function contactEventsChannel (contact, userId) {
  return eventChannel(emitter => {
    contact.on('profileUpdated', () => {
      return emitter(updateContactProfileEvent(contact))
    })
    contact.on('whisperInfoUpdated', () => {
      return emitter (updatePubKeyRequest(contact))
    })
    contact.on('contactRemoved', (apiUser) => {
      if (apiUser.id === userId) {
        emitter(deleteContact(contact.id))
        return emitter(END)
      }
    })
    return () => {
      contact.removeListener('profileUpdated', () => {
        return emitter(updateContactProfileEvent(contact))
      })
      contact.removeListener('whisperInfoUpdated', () => {
        return emitter(updatePubKeyRequest(contact))
      })
      contact.removeListener('contactRemoved', (apiUser) => {
        if (apiUser.id === userId) {
          emitter(deleteContact(contact.id))
          return emitter(END)
        }
      })
    }
  })
}

function* proccedPrevChannels () {
  let { channels } = yield select()
  let contactsChannels = channels.contactsChannels

  if (Object.keys(contactsChannels).length) {
    Object.keys(contactsChannels).forEach(channel => channel.close())
    yield put(removeContactsChannels())
  }
}

function* setupContactEventsHandler (contact) {
  let { user } = yield select()
  let contactChannel = yield call(contactEventsChannel, contact, user.id)
  yield put(addContactChannel(contact.id, contactChannel))

  while (true) {
    let action = yield take(contactChannel)
    yield put(action)
  }
}

function* proccedFetchContacts ({ payload }) {
  let { contacts } = payload
  yield call(proccedPrevChannels)
  yield all(Object.keys(contacts).map(contact => {
    return call(setupContactEventsHandler, contacts[contact].apiUser)
  }))
} 

function* proceedAddContact ({ payload }) {
  let { contact } = payload
  yield call(setupContactEventsHandler, contact.apiUser)
}

function* contactsEventsSaga() {
  yield takeEvery(FETCH_CONTACTS_SUCCESS, proccedFetchContacts)
  yield takeEvery(ADD_CONTACT, proceedAddContact)
}

export default contactsEventsSaga