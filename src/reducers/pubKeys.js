export default function pubKeys(state = {}, action) {
  switch (action.type) {
    case 'REPLACE_CONTACTS': {
      let apiContacts = Object.keys(action.contacts).map(key => 
        action.contacts[key].apiUser)
      let pubKeysPromises = apiContacts.map(apiUser => 
        apiUser.getPubKey().then(key => 
          {return key}))
      let pubKeys = Promise.all(pubKeysPromises).then( pubKeysArray => {
          return pubKeysArray.reduce((obj, pubKey, index) => {
            obj[pubKey] = apiContacts[index]
            return obj
          }, {})
        })
      return pubKeys
    }
    case 'ADD_PUB_KEY':
      return Object.assign({}, state, {[action.pubKey]: action.user})
    case 'UPDATE_PUB_KEY': {
      let newState = Object.assign({}, state)
      Object.defineProperty(newState, action.newPubKey,
        Object.getOwnPropertyDescriptor(newState, action.oldPubKey))
      delete newState[action.oldPubKey]
      return newState
    }
    case 'DELETE_PUB_KEY': {
      let newState = Object.assign({}, state)
      delete newState[action.pubKey]
      return newState
    }
    default:
      return state
  }
}