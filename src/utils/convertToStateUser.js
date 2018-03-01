import imageFromHash from './imageFromHash'
import base64images from '../assets/images/base64images'

const stateUser = (apiUser, name, avatar) => {
  return {
    id: apiUser.id,
    name: name? name: 'Anonymus',
    avatar: avatar,
    apiUser: apiUser
  }
}

const convertToStateUser = (api, apiUser) => {
  return apiUser.getProfile()
    .then(profile => {
      if (profile[1])
        return imageFromHash(api, profile[1])
          .then(base64Avatar => {
            return stateUser(apiUser, profile[0], base64Avatar)
          })

      return stateUser(apiUser, profile[0], base64images.no_avatar)
    })
}

export default convertToStateUser