export default function pubKeys(state = {}, action) {
  switch (action.type) {
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