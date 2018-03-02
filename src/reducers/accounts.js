import { GET_ACCOUNTS, CHANGE_ACCOUNT, PICK_ACCOUNT, REGISTER_USER, TOGGLE_ACCOUNT_FORM } from '../constants'
import { push } from 'react-router-redux'
import { addNotification } from '../actions'

const initialState = {
  accounts: [],
  active: null,
  choosen: null,
  isOpened: false
}

export default function accounts(state = initialState, {type, payload}) {
  switch (type) {
    case TOGGLE_ACCOUNT_FORM:
      return { ...state, isOpened: !payload.isOpened}
    case GET_ACCOUNTS: {
      if (payload.accounts) {
        if (payload.startedAccount) {
          payload.asyncDispatch(push('/'))
          return {
            accounts: payload.accounts,
            active: payload.startedAccount,
            choosen: payload.startedAccount,
            isOpened: false
          }
        }

        return { ...state, accounts: payload.accounts, isOpened: true}
      }

      let errorText = 'Error. Accounts weren\'t got.'
      payload.asyncDispatch(addNotification(errorText))
      console.log(errorText)
      
      return state
    }
    case CHANGE_ACCOUNT:
      return {
        ...state,
        active: payload.account,
        isOpened: !state.isOpened
      }
    case PICK_ACCOUNT: 
      return { ...state, choosen: payload.account }
    case REGISTER_USER: {
      let newState = { ...state }
      let accountIndex = state.accounts
        .findIndex(account => account.apiAccount.id === payload.walletId)
      newState.accounts[accountIndex].userName = payload.name

      return newState
    }
    default:
      return state
  }
}