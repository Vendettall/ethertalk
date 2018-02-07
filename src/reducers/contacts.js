const stub = {
  1: { id: 1, name: 'User1', avatar: '/images/avatar1.jpg' },
  2: { id: 2, name: 'User2', avatar: '/images/avatar2.jpg' },
  3: { id: 3, name: 'User3', avatar: '/images/avatar3.jpg' }
}

export default function contacts(state = stub, action) {
  switch (action.type) {
    case 'ADD_CONTACT': {
      return {
        ...state,
        [action.user.id]: {
          id: action.user.id,
          name: action.user.name,
          avatar: action.user.avatar
        }
      }
    }
    case 'DELETE_CONTACT': {
      let newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}