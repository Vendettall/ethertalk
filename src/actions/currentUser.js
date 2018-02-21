import { REGISTER_CURRENT_USER } from '../constants'
import imageFromHash from '../utils/imageFromHash'

export const registerCurrentUser = async (api, account, name, avatarAsFile) => {
  let apiUser, avatar, response, walletId = account.id

  apiUser = await api.UserRegistry.instance().register().then(user => {
    account.user = user
    return user
  })

  if (!apiUser) {
    response = false
  } else  {
    response = await api.Swarm.instance().upload(avatarAsFile).then(hash => {
      console.log('Image hash', hash)
      return imageFromHash(api, hash).then(image => {
        avatar = image
        return apiUser.setProfile(name, hash).then(result => {return result})
      })
    })
    response = response? true: false
  }
  return {
    type: REGISTER_CURRENT_USER,
    api,
    avatar,
    name,
    apiUser,
    walletId,
    response
  }
}