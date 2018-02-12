const stub = {
  1: {
    id: 1,
    isMy: true,
    user: {
      id: 15,
      name: 'Kirill',
      avatar: 'KirillsAvatar'
    }
  },
  2: {
    id: 2,
    isMy: false,
    user: {
      id: 20,
      name: 'Michael',
      avatar: 'MichaelsAvatar'
    }
  },
  3: {
    id: 3,
    isMy: true,
    user: {
      id: 50,
      name: 'Illya',
      avatar: 'IllyasAvatar'
    }
  },
  4: {
    id: 4,
    isMy: false,
    user: {
      id: 6,
      name: 'Mark',
      avatar: 'MarkssAvatar'
    }
  },
}

export default function invitations(state = stub, action) {
  switch (action.type) {
    case 'INIT_INVITATIONS':
      return action.invitations
    case 'ADD_INVITATION':
      return Object.assign({}, state, action.invitation)
    case 'DELETE_INVITATION':
      let newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    default:
      return state
  }
}