import { REPLACE_PUBKEYS, ADD_PUB_KEY, UPDATE_PUB_KEY, DELETE_PUB_KEY } from '../constants'

export default function pubKeys(state = {}, {type, payload}) {
  switch (type) {
    case REPLACE_PUBKEYS:
      return payload.pubKeys
    case ADD_PUB_KEY:
      return { ...state, [payload.pubKey]: payload.user }
    case UPDATE_PUB_KEY: {
      let newState = { ...state }

      Object.defineProperty(newState, payload.newPubKey,
        Object.getOwnPropertyDescriptor(newState, payload.oldPubKey))

      delete newState[payload.oldPubKey]

      return newState
    }
    case DELETE_PUB_KEY: {
      let newState = { ...state }
      delete newState[payload.pubKey]

      return newState
    }
    default:
      return state
  }
}