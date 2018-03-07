import { FETCH_PUBKEYS_SUCCESS, UPDATE_PUBKEY_SUCCESS, ADD_PUB_KEY, DELETE_PUB_KEY } from '../constants'

export default function pubKeys(state = {}, { type, payload }) {
  switch (type) {
    case FETCH_PUBKEYS_SUCCESS:
      return payload.pubKeys
    case UPDATE_PUBKEY_SUCCESS: {
      let newState = { ...state }

      Object.defineProperty(newState, payload.newPubKey,
        Object.getOwnPropertyDescriptor(newState, payload.oldPubKey))

      delete newState[payload.oldPubKey]

      return newState
    }
    case ADD_PUB_KEY:
      return { ...state, [payload.pubKey]: payload.user }
    case DELETE_PUB_KEY: {
      let newState = { ...state }
      delete newState[payload.pubKey]

      return newState
    }
    default:
      return state
  }
}