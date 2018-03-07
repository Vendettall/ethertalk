import { fork } from 'redux-saga/effects'
import generalSaga from './general'
import accountsSaga from './accounts'
import contactsSaga from './contacts'
import invitationsSaga from './invitations'
import messagesSaga from './messages'
import pubKeysSaga from './pubKeys'
import userSaga from './user'
import socketEventsSaga from './socketEvents'
import userEventsSaga from './userEvents'
import contactsEventsSaga from './contactsEvents'
import invitationsEventsSaga from './invitationsEvents'
import notificationsSaga from './notifications'
import spinnerSaga from './spinner'


const sagas = [
  spinnerSaga, // must be first for catching request before results
  generalSaga,
  accountsSaga,
  contactsSaga,
  invitationsSaga,
  messagesSaga,
  pubKeysSaga,
  userSaga,
  socketEventsSaga,
  userEventsSaga,
  contactsEventsSaga,
  invitationsEventsSaga,
  notificationsSaga
]

function* saga() {
  yield sagas.map(saga => fork(saga))
}


export default saga