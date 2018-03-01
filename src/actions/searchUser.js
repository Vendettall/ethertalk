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
    let response = null
    Object.keys(invitations).forEach(invKey => {
      if (invitations[invKey].user.id === userId) {
        response = {}
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
    let response = null
    if (contacts.hasOwnProperty(userId)) {
      response = {
        answer: 'This user has already in your contacts.',
        stateUser: contacts[userId]
      }
    }
    return response
  }

  let response = {}
  if (text === walletId) // check if search adress isn't users one
    response.answer = 'It is you.'
  else
    response = await api.UserRegistry.instance().getUser(text)
      .then(user => {
        if (!user) // check if user exist
          return { answer: 'User not found.' }
        let inInvitations = proceedInInvitations(invitations, user.id) 
        // check if user in our invitations and return response if yes
        if (inInvitations)
          return inInvitations
        let inContacts = poceedInContacts(contacts, user.id)
        // check if user in our contacts and return response if yes
        if (inContacts)
          return inContacts
        return convertToStateUser(user)
          .then(stateUser => {
            return {
              answer: 'You can invite this user.',
              stateUser: stateUser,
              apiUser: user
            }
          })
      })
  return {
    type: SEARCH_USER,
    response
  }
}