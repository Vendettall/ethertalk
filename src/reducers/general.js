export default function general(state = {}, action) {
  switch (action.type) {
    case 'SET_API': {
      return Object.assign({}, state, {api: action.api})
    }
    case 'UPDATE_CURRENT_USER': {
      return Object.assign({}, state, {user: action.user})
    }
    default:
      return state
  }
}