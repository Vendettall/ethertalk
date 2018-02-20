export const addPubKey = (pubKey, user) => {
  return {
    type: 'ADD_PUB_KEY',
    pubKey,
    user
  }
}

export const updatePubKey = async (userApi, pubKeys) => {
  let newPubKey = userApi.getPubKey()
  let oldPubKey = Object.keys(pubKeys).find(pubKey => userApi.id === pubKeys[pubKey].id)
  return {
    type: 'UPDATE_PUB_KEY',
    oldPubKey,
    newPubKey
  }
}

export const deletePubKey = pubKey => {
  return {
    type: 'DELETE_PUB_KEY',
    pubKey
  }
}