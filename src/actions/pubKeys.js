export const addPubKey = (pubKey, user) => {
  return {
    type: 'ADD_PUB_KEY',
    pubKey,
    user
  }
}

export const updatePubKey = (oldPubKey, newPubKey) => {
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