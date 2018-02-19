const initialState = {
  id: null,
  name: '',
  avatar: null,
  apiUser: null,
  walletId: null
}

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case 'REPLACE_CURRENT_USER':
      return action.user
    case 'REGISTER_CURRENT_USER': {
      if (action.response) {
        return Object.assign({}, state, {name: action.name, avatar: action.avatar})
      }
      return state
    }
    default:
      return state
  }
}