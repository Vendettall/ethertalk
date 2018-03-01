import { REPLACE_CONTACTS, ACCEPT_INVITATION, ACCEPT_INVITATION_BY_INTERACTOR, DELETE_CONTACT } from '../constants'
import { updateContactProfile, deleteContact, updatePubKey } from '../actions'

export const contactsMiddleware = store => next => action => {
  // setup handlers
  const setupContactHandler = contact => {
    contact.on('profileUpdated', () => {
      store.dispatch(updateContactProfile(contact))
    })
    contact.on('whisperInfoUpdated', () => {
      let pubKeys = store.getState().pubKeys
      store.dispatch(updatePubKey(contact, pubKeys))
    })
    contact.on('contactRemoved', apiUser => {
      if (apiUser.id === store.getState().user.id)
        store.dispatch(deleteContact(contact))
    })
  }
  // remove handlers
  const removeContactHandler = contact => {
    contact.removeListener('profileUpdated', () => {
      store.dispatch(updateContactProfile(contact))
    })
    contact.removeListener('whisperInfoUpdated', () => {
      let pubKeys = store.getState().pubKeys
      store.dispatch(updatePubKey(contact, pubKeys))
    })
    contact.removeListener('contactRemoved', (apiUser) => {
      if (apiUser.id === store.getState().user.id)
        store.dispatch(deleteContact(contact.id))
    })
  }
  // proceed add/remove contacts and then do the same with listeners for them
  if (action.type === REPLACE_CONTACTS) {
    let prevContacts = store.getState().contacts

    if (Object.keys(prevContacts).length) {
      Object.keys(prevContacts).forEach(contact => {
        removeContactHandler(prevContacts[contact].apiUser)
      })
    }

    Object.keys(action.contacts).forEach(contact => {
      setupContactHandler(action.contacts[contact].apiUser)
    })
  } 
  else if (action.type === ACCEPT_INVITATION)
    setupContactHandler(action.interactor)
  else if (action.type === ACCEPT_INVITATION_BY_INTERACTOR)
    setupContactHandler(action.invitation.user.apiUser)
  else if (action.type === DELETE_CONTACT)
    removeContactHandler(action.contact)

  return next(action)
}