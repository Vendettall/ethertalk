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

export default function user(state = initialState, {type, payload}) {
  switch (type) {
    case GET_ACCOUNTS:
    case CHANGE_ACCOUNT: {
      let user = payload.user

      if (user) {
        payload.asyncDispatch(replaceInvitations(payload.api, user.apiUser))
        payload.asyncDispatch(replaceContacts(payload.api, user.apiUser))
        payload.asyncDispatch(setSocket(payload.api, user.apiUser))
        return user
      }

      payload.asyncDispatch(push('/registration'))

      return state
    }
    case REGISTER_USER: {
      if (payload.apiUser) {
        if (payload.response) {
          payload.asyncDispatch(setSocket(payload.api, payload.apiUser))
          payload.asyncDispatch(push('/'))
          return {
            id: payload.apiUser.id,
            name: payload.name, 
            avatar: payload.avatar,
            apiUser: payload.apiUser,
            walletId: payload.walletId
          }
        }

        let errorText = 'Error. Profile wasn\'t set up, but user was registered'
        payload.asyncDispatch(addNotification(errorText))
        console.log(errorText)

        return state
      }

      let errorText = 'Error. User wasn\'t registered.'
      payload.asyncDispatch(addNotification(errorText))
      console.log(errorText)
      
      return state
    }
    default:
      return state
  }
}