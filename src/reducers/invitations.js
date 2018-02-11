export default function invitations(state = {}, action) {
  switch (action.type) {
    case 'INIT_INVITATIONS':
      return action.invitations
    case 'ADD_INVITATION':
      return {
        ...state,
        [action.user.id]: {
          id: action.user.id,
          name: action.user.name,
          avatar: action.user.avatar,
          isMy: action.isMy
        }
      }
    case 'DELETE_INVITATION':
      let newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    default:
      return state
  }
}