export default function contacts(state = {}, action) {
  switch (action.type) {
    case 'INIT_CONTACTS': {
      return action.contacts
    }
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