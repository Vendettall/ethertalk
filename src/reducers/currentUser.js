const initialState = {
  id: -1,
  name: '',
  avatar: null
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
    default:
      return state
  }
}