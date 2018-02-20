import { updateContactProfile, deleteContact } from '../actions/contacts'
import { updatePubKey } from '../actions/pubKeys'

export const contactsMiddleware = store => next => action => {
  const setupContactHandler = contact => {
    contact.on('profileUpdated', () => {
      store.dispatch(updateContactProfile(contact))
    })
    contact.on('whisperInfoUpdated', () => {
      let pubKeys = store.getState().pubKeys
      store.dispatch(updatePubKey(contact, pubKeys))
    })
    contact.on('contactRemoved', apiUser => {
      if (apiUser.id === store.getState().currentUser.id) {
        store.dispatch(deleteContact(contact))
      }
    })
  }

  const removeContactHandler = contact => {
    contact.removeListener('profileUpdated', () => {
      store.dispatch(updateContactProfile(contact))
    })
    contact.removeListener('whisperInfoUpdated', () => {
      let pubKeys = store.getState().pubKeys
      store.dispatch(updatePubKey(contact, pubKeys))
    })
    contact.removeListener('contactRemoved', (apiUser) => {
      if (apiUser.id === store.getState().currentUser.id) {
        store.dispatch(deleteContact(contact.id))
      }
    })
  }

  switch (action.type) {
    case 'REPLACE_CONTACTS': {
      let prevContacts = store.getState().contacts
      if (Object.keys(prevContacts).length) {
        Object.keys(prevContacts).forEach(contact => {
          setupContactHandler(prevContacts[contact].apiUser)
        })
      }
      Object.keys(action.contacts).forEach(contact => {
        removeContactHandler(action.contacts[contact].apiUser)
      })
      break
    }
    case 'ACCEPT_INVITATION': {
      setupContactHandler(action.interlocutor)
      break
    }
    case 'ACCEPT_INVITATION_BY_INTERLOCUTOR': {
      setupContactHandler(action.invitation.user.apiUser)
      break
    }
    case 'DELETE_CONTACT': {
      removeContactHandler(action.contact)
      break
    }
    default:
  }

  return next(action)
}