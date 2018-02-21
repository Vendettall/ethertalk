import { CHOOSE_ACCOUNT, REGISTER_CURRENT_USER } from '../constants'
import convertToStateUser from '../utils/convertToStateUser'
import { push } from 'react-router-redux'
import { replaceInvitations, replaceContacts, setSocket } from '../actions'

const initialState = {
  id: null,
  name: '',
  avatar: null,
  apiUser: null,
  walletId: null
}

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_ACCOUNT:
      if (action.hasUser) {
        action.asyncDispatch(replaceInvitations(action.account.user))
        action.asyncDispatch(replaceContacts(action.account.user))
        action.asyncDispatch(setSocket(action.api, action.account.user))
        return {
          ...convertToStateUser(action.account.user),
          apiUser: action.account.user,
          walletId: action.account.id
        }
      } else {
        action.asyncDispatch(push('/registration'))
        return state
      }
    case REGISTER_CURRENT_USER: {
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
      return state
    }
    default:
      return state
  }
}