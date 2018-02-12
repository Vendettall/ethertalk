export default function general(state = {}, action) {
  switch (action.type) {
    case 'SET_API': {
      return Object.assign({}, state, {api: action.api})
    }
    case 'UPDATE_CURRENT_USER': {
      return Object.assign({}, state, {user: action.user})
    }
    case 'UPDATE_CURRENT_USER_WALLET_ID': {
      return Object.assign({}, state, {walletId: action.walletId})
    }
    default:
      return state
  }
}