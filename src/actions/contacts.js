import { FETCH_CONTACTS_REQUEST, FETCH_CONTACTS_SUCCESS, FETCH_CONTACTS_ERROR,
  ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT_PROFILE_EVENT, UPDATE_CONTACT_PROFILE } from '../constants'

export const fetchContactsRequest = (api, apiUser) => {
  return {
    type: FETCH_CONTACTS_REQUEST,
    payload: ({ api, apiUser })
  }
}

export const fetchContactsSuccess = contacts => {
  return {
    type: FETCH_CONTACTS_SUCCESS,
    payload: ({ contacts })
  }
}

export const fetchContactsError = error => {
  return {
    type: FETCH_CONTACTS_ERROR,
    payload: new Error(error),
    error: true
  }
}

export const addContact = contact => {
  return {
    type: ADD_CONTACT,
    payload: ({ contact })
  }
}

export const deleteContact = contactId => {
  return {
    type: DELETE_CONTACT,
    payload: ({ contactId })
  }
}

export const updateContactProfileEvent = contact => {
  return {
    type: UPDATE_CONTACT_PROFILE_EVENT,
    payload: ({ contact })
  }
}

export const updateContactProfile = (contactId, profile) => {
  return {
    type: UPDATE_CONTACT_PROFILE,
    payload: ({ contactId, profile })
  }
}