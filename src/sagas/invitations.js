import { call, put, all, select, takeEvery } from 'redux-saga/effects'
import { FETCH_INVITATIONS_REQUEST, ACCEPT_INVITATION_REQUEST, REJECT_INVITATION_REQUEST,
  SEND_INVITATION_REQUEST, ADD_INVITATION_REQUEST, UPDATE_INVITEE_PROFILE_EVENT } from '../constants'
import { addNotification, addContact, fetchInvitationsSuccess, fetchInvitationsError,
  acceptInvitationSuccess, acceptInvitationError, rejectInvitationSuccess, rejectInvitationError,
  sendInvitationSuccess, sendInvitationError, addInvitationError } from '../actions'
import convertToStateInvitation from '../utils/convertToStateInvitation'

// -> FETCH INVITATIONS
function getSentInvitations (api, apiUser) {
  return apiUser.getSentInvitations()
    .then(sentInvitations => ({ sentInvitations }))
    .catch(sentError => ({ sentError }))
} 

function getInboxInvitations (api, apiUser) {
  return apiUser.getInboxInvitations()
    .then(inboxInvitations => ({ inboxInvitations }))
    .catch(inboxError => ({ inboxError }))
}

function getInvitationsUsers (api, invitations, isMy) {
  return invitations.map(inv => {
    return inv.getUser()
      .then(invitationUser => ({ invitationUser }))
      .catch(error => ({ error }))
    })
}

function* proceedInvitationUserResult (result) {
  let { invitationUser, error } = result

  if (invitationUser)
    return invitationUser
  else {
    console.log(`Invitation sender/receiver wasn't got. ${error}`)
    yield put(addNotification('Invitation sender/receiver wasn\'t got'))
    return null
  }
}

function getInvitation (api, inv, user, isMy) {
  return convertToStateInvitation(api, inv, user, isMy)
    .then(invitation => ({ invitation }))
    .catch(error => ({ error }))
}

function* getInvitationsPromises (api, invitations, isMy) {
  if (invitations.length) {
    let invitationsUsersPromises = yield call(getInvitationsUsers, api, invitations, isMy)
    let invitationsUsers = yield all([...invitationsUsersPromises])
    let invitationsUsersResults = yield all(invitationsUsers.map(result => call(proceedInvitationUserResult, result)))

    return invitations.map((inv, index) => {
      return call(getInvitation, api, inv, invitationsUsersResults[index], isMy)
    })
  }

  return []
}

function* proceedInvitationResult (result) {
  let { invitation, error } = result

  if (invitation)
    return invitation
  else {
    console.log(`Invitation wasn't got. ${error}`)
    yield put(addNotification('Invitation wasn\'t got'))
    return null
  }
}

function getStateInvitations (invitations) {
  if (!invitations.length) return {}
  return invitations.reduce((obj, inv) => {
    obj[inv.id] = inv
    return obj
  }, {})
}

function* fetchInvitations ({ payload }) {
  let { api, apiUser } = payload
  let { sentInvitations, sentError } = yield call(getSentInvitations, api, apiUser)
  let { inboxInvitations, inboxError } = yield call(getInboxInvitations, api, apiUser)

  if (sentInvitations && inboxInvitations) {
    let sentInvitationsPromises = yield call(getInvitationsPromises, api, sentInvitations, true)
    let inboxInvitationsPromises = yield call(getInvitationsPromises, api, inboxInvitations, false)
    let invitationsResults = yield all([...sentInvitationsPromises, ...inboxInvitationsPromises])
    let invitations = yield all(invitationsResults.map(result => call(proceedInvitationResult, result)))
    let stateInvitations = yield call(getStateInvitations, invitations)
    yield put(fetchInvitationsSuccess(stateInvitations))
  } else {
    if (sentError) {
      console.log(`Sent invitations wasn't got. Error: ${sentError}`)
      yield put(addNotification('Sent invitations wasn\'t got'))
    }
    if (inboxError) {
      console.log(`Inbox invitations wasn't got. Error: ${inboxError}`)
      yield put(addNotification('Inbox invitations wasn\'t got'))
    }

    yield put(fetchInvitationsError(sentError || inboxError))
  }
}
// <- FETCH INVITATIONS

// -> ACCEPT INVITATION
function resolveAcceptInvitation (invitation, apiUser) {
  return apiUser.acceptInvitation(invitation.apiInvitation)
  .then(success => ({ success }))
  .catch(error => ({ error }))
}

function* acceptInvitation({ payload }) {
  let { invitation } = payload
  let { user } = yield select()
  let { success, error } = yield call(resolveAcceptInvitation, invitation, user.apiUser)

  if (success) {
    let invitationId = invitation.id
    yield put(addContact(invitation.user))
    yield put(acceptInvitationSuccess(invitationId))
  } else {
    console.log(`Invitation wasn't accepted. ${error}`)
    yield put(addNotification('Invitation wasn\'t accepted.'))
    yield put(acceptInvitationError(error))
  }
}
// <- ACCEPT INVITATION

// -> REJECT INVITATION
function resolveRejectInvitation (invitation, apiUser) {
  return apiUser.apiUser.rejectInvitation(invitation.apiInvitation)
  .then(success => ({ success }))
  .catch(error => ({ error }))
}

function* rejectInvitation({ payload }) {
  let { invitation } = payload
  let { user } = yield select()
  let { success, error } = yield call(resolveRejectInvitation, invitation, user.apiUser)

  if (success) {
    let invitationId = invitation.id
    yield put(rejectInvitationSuccess(invitationId))
  } else {
    console.log(`Invitation wasn't rejected. ${error}`)
    yield put(addNotification('Invitation wasn\'t rejected.'))
    yield put(rejectInvitationError(error))
  }
}
// <- REJECT INVITATION

// -> SEND INVITATION
function resolveSendInvitation (apiUser, apiInteractor) {
  return apiUser.invite(apiInteractor)
    .then(success => ({ success}))
    .catch(error => ({ error }))
}

function* sendInvitation({ payload }) {
  let { apiInteractor } = payload
  let { user } = yield select()
  let { success, error } = yield call(resolveSendInvitation, user.apiUser, apiInteractor)

  if (success) {
    yield put(sendInvitationSuccess())
  } else {
    console.log(`Invitation wasn't sent. ${error}`)
    yield put(addNotification('Invitation wasn\'t sent.'))
    yield put(sendInvitationError(error))
  }
}
// <- SEND INVITATION

// -> ADD INVITATION
function getInviter (apiInvitation) {
  return apiInvitation.getUser()
    .then(inviter => ({ inviter }))
    .catch(error => ({ error }))
}

function getStateInvitation (api, apiInvitation, inviter, isMy) {
  return convertToStateInvitation(api, apiInvitation, inviter, isMy)
    .then(stateInvitation => ({ stateInvitation }))
    .catch(error => ({ error }))
}

function* addInvitation(apiInvitation, isMy) {
  let { general } = yield select()
  let api = general.api
  let { inviter, error } = yield call(getInviter, apiInvitation) 

  if (inviter) {
    let { stateInvitation, error } = yield call(getStateInvitation, api, apiInvitation, inviter, isMy)
    if (stateInvitation) {
      yield put(addInvitation(stateInvitation))
    } else {
      console.log(`Can't convert to state invitation. ${error}`)
      yield put(addNotification('Can\'t convert to state invitation.'))
      yield put(addInvitationError(error))
    }
  } else {
    console.log(`Inviter wasn't got. ${error}`)
    yield put(addNotification('Inviter wasn\'t got.'))
    yield put(addInvitationError(error))
  }
}
// <- ADD INVITATION

// -> UPDATE INVITEE PROFILE
function getInviteeProfile (invitation) {
  invitation.apiUser.getProfile()
    .then(inviteeProfile => ({ inviteeProfile }))
    .catch(error => ({ error }))
}

function* updateInviteeProfile ({ payload }) {
  let { invitation } = payload
  let { inviteeProfile, error } = yield call(getInviteeProfile, invitation)

  if (inviteeProfile) {
    yield put(updateInviteeProfile(invitation.id, inviteeProfile))
  } else {
    console.log(`Invitee profile wasn't got. ${error}`)
    yield put(addNotification('Invitee profile wasn\'t got.'))
  }
}
// <- UPDATE INVITEE PROFILE

function* invitationsSaga() {
  yield takeEvery(FETCH_INVITATIONS_REQUEST, fetchInvitations)
  yield takeEvery(ACCEPT_INVITATION_REQUEST, acceptInvitation)
  yield takeEvery(REJECT_INVITATION_REQUEST, rejectInvitation)
  yield takeEvery(SEND_INVITATION_REQUEST, sendInvitation)
  yield takeEvery(ADD_INVITATION_REQUEST, addInvitation)
  yield takeEvery(UPDATE_INVITEE_PROFILE_EVENT, updateInviteeProfile)
}

export default invitationsSaga