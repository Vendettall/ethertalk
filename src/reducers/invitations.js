const stub =  {
  4: { id: 4, name: 'User4', avatar: '/images/avatar4.jpg', isMy: false },
  5: { id: 5, name: 'User5', avatar: '/images/avatar5.jpg', isMy: true },
  6: { id: 6, name: 'User6', avatar: '/images/avatar6.jpg', isMy: false }
}

export default function invitations(state = stub, action) {
  switch (action.type) {
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