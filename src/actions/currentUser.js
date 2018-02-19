import convertToStateUser from '../utils/convertToStateUser'
import imageFromHash from '../utils/imageFromHash'

export const replaceCurrentUser = account => {
  let user = {
    ...convertToStateUser(account.user),
    apiUser: account.user,
    walletId: account.id
  }
  return {
    type: 'REPLACE_CURRENT_USER',
    user
  }
}

export const registerCurrentUser = async (api, apiUser, name, avatarAsFile) => {
  let avatar
  let response = await api.Swarm.instance().upload(avatarAsFile).then(hash => {
    console.log('Image hash', hash)
    return imageFromHash(api, hash).then(image => {
      avatar = image
      return apiUser.setProfile(name, hash).then(result => {return result})
    })
  }) // change router path
  response = response? true: false
  return {
    type: 'REGISTER_CURRENT_USER',
    avatar,
    name,
    response
  }
}