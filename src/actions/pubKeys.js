import { REPLACE_PUBKEYS, ADD_PUB_KEY, UPDATE_PUB_KEY, DELETE_PUB_KEY } from '../constants'

export const replacePubKeys = async contacts => {
  let apiContacts = Object.keys(contacts).map(key => contacts[key].apiUser)
  
  let pubKeysPromises = apiContacts.map(apiUser =>
    apiUser.getPubKey()
      .then(key => {return key})
  )

  let pubKeys = await Promise.all(pubKeysPromises)
    .then(pubKeysArray => {
      return pubKeysArray.reduce((obj, pubKey, index) => {
        obj[pubKey] = apiContacts[index]
        return obj
      }, {})
    })
    
  return {
    type: REPLACE_PUBKEYS,
    payload: {
      pubKeys: pubKeys
    }
  }
}

export const addPubKey = (pubKey, user) => {
  return {
    type: ADD_PUB_KEY,
    payload: {
      pubKey: pubKey,
      user: user
    }
  }
}

export const updatePubKey = async (userApi, pubKeys) => {
  let newPubKey = await userApi.getPubKey()
    .then(result => {return result})
  let oldPubKey = Object.keys(pubKeys).find(pubKey => userApi.id === pubKeys[pubKey].id)
  
  return {
    type: UPDATE_PUB_KEY,
    payload: {
      oldPubKey: oldPubKey,
      newPubKey: newPubKey
    }
  }
}

export const deletePubKey = pubKey => {
  return {
    type: DELETE_PUB_KEY,
    payload: {
      pubKey: pubKey
    }
  }
}