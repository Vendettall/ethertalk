export default function currentUser(state = {}, action) {
  switch (action.type) {
    case 'INIT_CURRENT_USER':
      return action.user
    default:
      return state
  }
}