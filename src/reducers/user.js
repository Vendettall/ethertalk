import { GET_ACCOUNTS, CHANGE_ACCOUNT, REGISTER_USER } from '../constants'
import { push } from 'react-router-redux'
import { replaceInvitations, replaceContacts, setSocket, addNotification } from '../actions'

const initialState = {
  id: null,
  name: '',
  avatar: null,
  apiUser: null,
  walletId: null
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
    case CHANGE_ACCOUNT: {
      let user = action.user

      if (user) {
        action.asyncDispatch(replaceInvitations(user.apiUser))
        action.asyncDispatch(replaceContacts(user.apiUser))
        action.asyncDispatch(setSocket(action.api, user.apiUser))
        return user
      }

      action.asyncDispatch(push('/registration'))

      return state
    }
    case REGISTER_USER: {
      if (action.apiUser) {
        if (action.response) {
          action.asyncDispatch(setSocket(action.api, action.apiUser))
          action.asyncDispatch(push('/'))
          return {
            id: action.apiUser.id,
            name: action.name, 
            avatar: action.avatar,
            apiUser: action.apiUser,
            walletId: action.walletId
          }
        }

        let errorText = 'Error. Profile wasn\'t set up, but user was registered'
        action.asyncDispatch(addNotification(errorText))
        console.log(errorText)

        return state
      }

      let errorText = 'Error. User wasn\'t registered.'
      action.asyncDispatch(addNotification(errorText))
      console.log(errorText)
      
      return state
    }
    default:
      return state
  }
}