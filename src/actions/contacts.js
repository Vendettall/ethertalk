export const initContacts = contacts => {
  return {
    type: 'INIT_CONTACTS',
    contacts
  }
}

export const addContact = user => {
  return {
    type: 'ADD_CONTACT',
    user
  }
}

export const deleteContact = id => {
  return {
    type: 'DELETE_CONTACT',
    id
  }
}