import { REPLACE_CONTACTS, ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT_PROFILE } from '../constants'
import convertToStateUser from '../utils/convertToStateUser'

export const replaceContacts = async apiUser => {
  let contactsPromises = await apiUser.getContacts().then(contacts => {
    return contacts.map(apiUser => 
      convertToStateUser(apiUser).then(result => {return result})
    )
  })

  let contacts = await Promise.all(contactsPromises).then(contacts => {
    if (!contacts.length) return {}
    return contacts.reduce((obj, contact) => {
      obj[contact.id] = contact
      return obj
    }, {})
  })
  return {
    type: REPLACE_CONTACTS,
    contacts
  }
}

export const addContact = contact => {
  return {
    type: ADD_CONTACT,
    contact
  }
}

export const deleteContact = contact => {
  return {
    type: DELETE_CONTACT,
    contact
  }
}

export const updateContactProfile = async apiContact => {
  let profile = await apiContact.getProfile().then(result => {return result})
  let contactId = apiContact.id
  return {
    type: UPDATE_CONTACT_PROFILE,
    profile,
    contactId
  }
}