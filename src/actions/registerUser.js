import { UPDATE_REGISTRATION_NAME, UPDATE_REGISTRATION_AVATAR, REGISTER_USER } from '../constants'
import imageFromHash from '../utils/imageFromHash'
import imageToHash from '../utils/imageToHash'

export const updateRegistrationName = name => {
  return {
    type: UPDATE_REGISTRATION_NAME,
    name
  }
}

export const updateRegistrationAvatar = avatar => {
  return {
    type: UPDATE_REGISTRATION_AVATAR,
    avatar
  }
}

export const registerUser = async (api, account, name, avatarAsFile) => {
  let apiUser, avatar, response, walletId = account.id

  apiUser = await api.UserRegistry.instance().register() // register user by api
    .then(user => {
      account.user = user
      return user
    })

  if (apiUser)
    response = await imageToHash(api, avatarAsFile) 
    // set hash as avatar in api profile, but get it as bas64 image for state
      .then(hash => {
        return imageFromHash(api, hash)
          .then(image => {
            avatar = image
            return apiUser.setProfile(name, hash)
              .then(result => {return result})
          })
      })

  return {
    type: REGISTER_USER,
    api,
    avatar,
    name,
    apiUser,
    walletId,
    response
  }
}