import { REPLACE_CONTACTS, ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT_PROFILE } from '../constants'
import convertToStateUser from '../utils/convertToStateUser'

export const replaceContacts = async (api, apiUser) => {
  let contactsPromises = await apiUser.getContacts()
    .then(contacts => {
      return contacts.map(user => 
        convertToStateUser(api, user)
          .then(result => {return result})
      )
    })

  let contacts = await Promise.all(contactsPromises)
    .then(contacts => {
      if (!contacts.length) return {}
      return contacts.reduce((obj, contact) => {
        obj[contact.id] = contact
        return obj
      }, {})
    })

  return {
    type: REPLACE_CONTACTS,
    payload: {
      contacts: contacts
    }
  }
}

export const addContact = contact => {
  return {
    type: ADD_CONTACT,
    payload: {
      contact: contact
    }
  }
}

export const deleteContact = contact => {
  return {
    type: DELETE_CONTACT,
    payload: {
      contact: contact
    }
  }
}

export const updateContactProfile = async apiContact => {
  let profile = await apiContact.getProfile()
    .then(result => {return result})   
  let contactId = apiContact.id
  
  return {
    type: UPDATE_CONTACT_PROFILE,
    payload: {
      profile: profile,
      contactId: contactId
    }
  }
}