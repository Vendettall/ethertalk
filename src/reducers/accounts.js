import { GET_ACCOUNTS, CHOOSE_ACCOUNT } from '../constants'

const initialState = {
  accounts: [],
  active: null
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS: {
      if (action.accounts)
        return { ...state, accounts: action.accounts}
      console.log('Error. Accounts weren\'t got.')
      return state
    }
    case CHOOSE_ACCOUNT: 
      return { ...state, active: action.account }
    default:
      return state
  }
}