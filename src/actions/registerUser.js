export const updateRegistrationName = name => {
  return {
    type: 'UPDATE_REGISTRATION_NAME',
    name
  }
}

export const updateRegistrationAvatar = avatar => {
  return {
    type: 'UPDATE_REGISTRATION_AVATAR',
    avatar
  }
}