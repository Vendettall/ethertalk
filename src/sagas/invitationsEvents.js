import { eventChannel, END } from 'redux-saga'
import { call, put, take, select, all, takeEvery } from 'redux-saga/effects'
import { FETCH_INVITATIONS_SUCCESS, ADD_INVITATION_SUCCESS } from "../constants"
import { addContact, removeInvitation, updateContactProfileEvent,
  addInvitationChannel, removeInvitationsChannel } from '../actions'


function inboxInvitationEventsChannel (invitation) {
  return eventChannel(emitter => {
    invitation.user.apiUser.on('profileUpdated', () => {
      return emitter(updateContactProfileEvent(invitation))
    })
    return () => {
      invitation.user.apiUser.on('profileUpdated', () => {
        return emitter(updateContactProfileEvent(invitation))
      })
    }
  })
}

function sentInvitationEventsChannel (invitation) {
  return eventChannel(emitter => {
    invitation.user.apiUser.on('profileUpdated', () => {
      return emitter(updateContactProfileEvent(invitation))
    })
    invitation.on('accepted', () => {
      emitter(addContact(invitation.user))
      emitter(removeInvitation(invitation.id))
      return emitter(END)
    })
    invitation.on('reject', () => {
      emitter(removeInvitation(invitation.id))
      return emitter(END)
    })
    return () => {
      invitation.user.apiUser.removeListener('profileUpdated', () => {
        return emitter(updateContactProfileEvent(invitation))
      })
      invitation.removeListener('accepted', () => {
        emitter(addContact(invitation.user))
        emitter(removeInvitation(invitation.id))
        return emitter(END)
      })
      invitation.removeListener('reject', () => {
        emitter(removeInvitation(invitation.id))
        return emitter(END)
      })
    }
  })
}

function* proccedPrevChannels () {
  let { channels } = yield select()
  let invitationsChannels = channels.invitationsChannels

  if (Object.keys(invitationsChannels).length) {
    Object.keys(invitationsChannels).forEach(channel => channel.close())
    yield put(removeInvitationsChannel())
  }
}

function* setupInboxInvitationEventsHandler (invitation) {
  let inboxInvitationChannel = yield call(inboxInvitationEventsChannel, invitation)
  yield put(addInvitationChannel(invitation.id, inboxInvitationChannel))

  while (true) {
    let action = yield take(inboxInvitationChannel)
    yield put(action)
  }
}

function* setupSentInvitationEventsHandler (invitation) {
  let sentInvitationChannel = yield call(sentInvitationEventsChannel, invitation)
  yield put(addInvitationChannel(invitation.id, sentInvitationChannel))

  while (true) {
    let action = yield take(sentInvitationChannel)
    yield put(action)
  }
}

function* proccedFetchInvitations ({ payload }) {
  let { invitations } = payload
  yield call(proccedPrevChannels)
  yield all(Object.keys(invitations).map(invitation => {
    if (invitation.isMy)
      return call(setupSentInvitationEventsHandler, invitations[invitation])
    return call (setupInboxInvitationEventsHandler, invitations[invitation])
  }))
} 

function* proceedAddInvitation ({ payload }) {
  let { invitation } = payload
  yield call(setupSentInvitationEventsHandler, invitation)
}

function* invitationsEventsSaga() {
  yield takeEvery(FETCH_INVITATIONS_SUCCESS, proccedFetchInvitations)
  yield takeEvery(ADD_INVITATION_SUCCESS, proceedAddInvitation)
}


export default invitationsEventsSaga