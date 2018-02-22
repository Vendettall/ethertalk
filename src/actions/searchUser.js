import { TOGGLE_FORM, UPDATE_SEARCH_TEXT, SEARCH_USER } from '../constants'
import convertToStateUser from '../utils/convertToStateUser'

export const toggleForm = isOpened => {
  return {
    type: TOGGLE_FORM,
    isOpened
  }
}

export const updateSearchText = text => {
  return {
    type: UPDATE_SEARCH_TEXT,
    text
  }
}

export const searchUser = async (text, api, walletId, invitations, contacts) => {
  const proceedInInvitations = (invitations, userId) => {
    let response = {}
    Object.keys(invitations).forEach(invKey => {
      if (invitations[invKey].user.id === userId) {
        if (invitations[invKey].isMy === true)
          response.answer = 'You have already invited this user.'
        else
          response.answer = 'This user has already invited you.'
        response.stateUser = invitations[invKey].user
        return
      }
    })
    return response
  }
  
  const poceedInContacts = (contacts, userId) => {
    let response = {}
    if (contacts.hasOwnProperty(userId)) {
      response.answer = 'This user has already in your contacts.'
      response.stateUser = contacts[userId]
    }
    return response
  }

  let response = {}
  if (text === walletId)
    response.answer = 'It is you.'
  else
    response = await api.UserRegistry.instance().getUser(text).then(user => {
      if (!user)
        return { answer: 'User not found.' }
      let inInvitations = proceedInInvitations(invitations, user.id)
      if (inInvitations)
        return inInvitations
      let inContacts = poceedInContacts(contacts, user.id)
      if (inContacts)
        return inContacts
      return {
        answer: 'You can invite this user.',
        stateUser: convertToStateUser(user),
        apiUser: user
      }
    })
  return {
    type: SEARCH_USER,
    response
  }
}