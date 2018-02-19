const stub = {
  8: {
    id: 8,
    name: 'Inna',
    avatar: 'InnasAvatar'
  },
  12: {
    id: 12,
    name: 'Kate',
    avatar: 'KatesAvatar'
  },
  34: {
    id: 34,
    name: 'Mira',
    avatar: 'MirasAvatar'
  }
}

export default function contacts(state = stub, action) {
  switch (action.type) {
    case 'REPLACE_CONTACTS': 
      return action.contacts
    case 'ADD_CONTACT':
      return Object.assign({}, state, action.contact)
    case 'DELETE_CONTACT': {
      let newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    }
    case 'ACCEPT_INVITATION': {
      if (action.response) {
        return Object.assign({}, state, {[action.interlocutor.id]: action.interlocutor})
      } else {
        return state
      }
    }
    default:
      return state
  }
}