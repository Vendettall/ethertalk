export const initCurrentUser = user => {
  return {
    type: 'INIT_CURRENT_USER',
    user
  }
}

export const updateUserId = id => {
  return {
    type: 'UPDATE_USER_ID',
    id
  }
}

export const updateUserName = name => {
  return {
    type: 'UPDATE_USER_NAME',
    name
  }
}

export const updateUserAvatar = avatar => {
  return {
    type: 'UPDATE_USER_AVATAR',
    avatar
  }
}

export const updateApiUser = apiUser => {
  return {
    type: 'UPDATE_API_USER',
    apiUser
  }
}

export const updateUserWalletId = walletId => {
  return {
    type: 'UPDATE_USER_WALLET_ID',
    walletId
  }
}