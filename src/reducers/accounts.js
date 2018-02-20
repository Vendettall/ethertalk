const initialState = {
  accounts: [],
  active: null
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case 'GET_ACCOUNTS': {
      if (action.accounts) {
        return Object.assign({}, state, {accounts: action.accounts})
      } else {
        return state
      }
    }
    case 'CHOOSE_ACCOUNT': 
      return Object.assign({}, state, {active: action.account})
    default:
      return state
  }
}