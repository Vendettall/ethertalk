import { REPLACE_CONTACTS, ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT_PROFILE } from '../constants'
import convertToStateUser from '../utils/convertToStateUser'

export const replaceContacts = async apiUser => {
  let contacts = await apiUser.getContacts().then(contacts => {
    if (!contacts.length) return {}
    return contacts.reduce((obj, apiUser) => {
      obj[apiUser.id.toString()] = Object.assign({}, convertToStateUser(apiUser))
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

export const updateContactProfile = apiContact => {
  let profile = apiContact.getProfile()
  let contactId = apiContact.id
  return {
    type: UPDATE_CONTACT_PROFILE,
    profile,
    contactId
  }
}