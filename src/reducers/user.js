import { CHOOSE_ACCOUNT, REGISTER_USER } from '../constants'
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

export default function user(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_ACCOUNT: {
      let user = action.account.user
      if (user) {
        action.asyncDispatch(replaceInvitations(user))
        action.asyncDispatch(replaceContacts(user))
        action.asyncDispatch(setSocket(action.api, user))
        return {
          ...convertToStateUser(user),
          apiUser: user,
          walletId: action.account.id
        }
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
        console.log('Error. Profile wasn\'t set up, but user was registered')
        return state
      }
      console.log('Error. User wasn\'t registered.')
      return state
    }
    default:
      return state
  }
}