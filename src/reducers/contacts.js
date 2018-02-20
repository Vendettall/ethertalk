// const stub = {
//   8: {
//     id: 8,
//     name: 'Inna',
//     avatar: 'InnasAvatar'
//   },
//   12: {
//     id: 12,
//     name: 'Kate',
//     avatar: 'KatesAvatar'
//   },
//   34: {
//     id: 34,
//     name: 'Mira',
//     avatar: 'MirasAvatar'
//   }
// }

export default function contacts(state = {}, action) {
  switch (action.type) {
    case 'REPLACE_CONTACTS': 
      return action.contacts
    case 'ADD_CONTACT':
      return Object.assign({}, state, {[action.contact.id]: action.contact})
    case 'DELETE_CONTACT': {
      let newState = Object.assign({}, state)
      delete newState[action.contact.id]
      return newState
    }
    case 'ACCEPT_INVITATION': {
      if (action.response) {
        return Object.assign({}, state, {[action.interlocutor.id]: action.interlocutor})
      } else {
        return state
      }
    }
    case 'ACCEPT_INVITATION_BY_INTERLOCUTOR': {
      return Object.assign({}, state, {[action.invitation.user.id]: action.invitation.user})
    }
    case 'UPDATE_CONTACT_PROFILE': {
      let contact = Object.assign({}, state[action.contactId])
      contact.name = action.profile.name
      contact.avatar = action.profile.avatar
      return Object.assign({}, state, {[action.contactId]: contact})
    }
    default:
      return state
  }
}