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
  //
  switch (action.type) {
    case REPLACE_CONTACTS: {
      let prevContacts = store.getState().contacts
      if (Object.keys(prevContacts).length) {
        Object.keys(prevContacts).forEach(contact => {
          removeContactHandler(prevContacts[contact].apiUser)
        })
      }
      Object.keys(action.contacts).forEach(contact => {
        setupContactHandler(action.contacts[contact].apiUser)
      })
      break
    }
    case ACCEPT_INVITATION: {
      setupContactHandler(action.interactor)
      break
    }
    case ACCEPT_INVITATION_BY_INTERACTOR: {
      setupContactHandler(action.invitation.user.apiUser)
      break
    }
    case DELETE_CONTACT: {
      removeContactHandler(action.contact)
      break
    }
    default:
  }

  return next(action)
}