import { REPLACE_PUBKEYS, ADD_PUB_KEY, UPDATE_PUB_KEY, DELETE_PUB_KEY } from '../constants'

export default function pubKeys(state = {}, action) {
  switch (action.type) {
    case REPLACE_PUBKEYS:
      return action.pubKeys
    case ADD_PUB_KEY:
      return { ...state, [action.pubKey]: action.user }
    case UPDATE_PUB_KEY: {
      let newState = { ...state }
      Object.defineProperty(newState, action.newPubKey,
        Object.getOwnPropertyDescriptor(newState, action.oldPubKey))
      delete newState[action.oldPubKey]
      return newState
    }
    case DELETE_PUB_KEY: {
      let newState = { ...state }
      delete newState[action.pubKey]
      return newState
    }
    default:
      return state
  }
}