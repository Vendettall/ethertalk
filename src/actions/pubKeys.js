import { FETCH_PUBKEYS_REQUEST, FETCH_PUBKEYS_SUCCESS, UPDATE_PUBKEY_REQUEST, UPDATE_PUBKEY_SUCCESS, 
  UPDATE_PUBKEY_ERROR, ADD_PUB_KEY, DELETE_PUB_KEY } from '../constants'

export const fetchPubKeysRequest = contacts => {
  return {
    type: FETCH_PUBKEYS_REQUEST,
    payload: ({ contacts })
  }
}

export const fetchPubKeysSuccess = pubKeys => {
  return {
    type: FETCH_PUBKEYS_SUCCESS,
    payload: ({ pubKeys })
  }
}

export const updatePubKeyRequest = apiUser => {
  return {
    type: UPDATE_PUBKEY_REQUEST,
    payload: ({ apiUser })
  }
}

export const updatePubKeySuccess = (newPubKey, oldPubKey) => {
  return {
    type: UPDATE_PUBKEY_SUCCESS,
    payload: ({ newPubKey, oldPubKey })
  }
}

export const updatePubKeyError = error => {
  return {
    type: UPDATE_PUBKEY_ERROR,
    payload: new Error(error),
    error: true
  }
}

export const addPubKey = (pubKey, user) => {
  return {
    type: ADD_PUB_KEY,
    payload: ({ pubKey, user })
  }
}

export const deletePubKey = pubKey => {
  return {
    type: DELETE_PUB_KEY,
    payload: ({ pubKey })
  }
}