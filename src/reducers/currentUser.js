const initialState = {
  id: null,
  name: '',
  avatar: null,
  apiUser: null,
  walletId: null
}

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case 'INIT_CURRENT_USER':
      return action.user
    case 'UPDATE_USER_ID':
      return Object.assign({}, state, {id: action.id})
    case 'UPDATE_USER_NAME':
      return Object.assign({}, state, {name: action.name})
    case 'UPDATE_USER_AVATAR':
      return Object.assign({}, state, {avatar: action.avatar})
    case 'UPDATE_API_USER':
      return Object.assign({}, state, {apiUser: action.apiUser})
    case 'UPDATE_USER_WALLET_ID':
      return Object.assign({}, state, {walletId: action.walletId})
    default:
      return state
  }
}