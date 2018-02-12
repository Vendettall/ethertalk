export const initContacts = contacts => {
  return {
    type: 'INIT_CONTACTS',
    contacts
  }
}

export const addContact = contact => {
  return {
    type: 'ADD_CONTACT',
    contact
  }
}

export const deleteContact = id => {
  return {
    type: 'DELETE_CONTACT',
    id
  }
}