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