import { GET_ACCOUNTS, CHANGE_ACCOUNT, PICK_ACCOUNT, REGISTER_USER, TOGGLE_ACCOUNT_FORM } from '../constants'
import { push } from 'react-router-redux'
import { addNotification } from '../actions'

const initialState = {
  accounts: [],
  active: null,
  choosen: null,
  isOpened: false
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ACCOUNT_FORM:
      return { ...state, isOpened: !action.isOpened}
    case GET_ACCOUNTS: {
      if (action.accounts) {
        if (action.startedAccount) {
          action.asyncDispatch(push('/'))
          return {
            accounts: action.accounts,
            active: action.startedAccount,
            choosen: action.startedAccount,
            isOpened: false
          }
        }
        return { ...state, accounts: action.accounts, isOpened: true}
      }
      let errorText = 'Error. Accounts weren\'t got.'
      action.asyncDispatch(addNotification(errorText))
      console.log(errorText)
      return state
    }
    case CHANGE_ACCOUNT:
      return {
        ...state,
        active: action.account,
        isOpened: !state.isOpened
      }
    case PICK_ACCOUNT: 
      return { ...state, choosen: action.account }
    case REGISTER_USER: {
      let newState = { ...state }
      let accountIndex = state.accounts.findIndex(account => account.apiAccount.id === action.walletId)
      newState.accounts[accountIndex].userName = action.name
      return newState
    }
    default:
      return state
  }
}