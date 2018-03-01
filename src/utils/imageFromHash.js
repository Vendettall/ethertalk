import base64images from '../assets/images/base64images'

export default function imageFromHash(api, hash) {
  return api.Swarm.instance().download(hash)
    .then(obj => {
      if (obj === null)
        return base64images.no_avatar
        
      let decoder = new TextDecoder('utf8')
      let base64String = `data:${obj.type};base64, ${btoa(decoder.decode(obj.data))}`
      
      return base64String
    })
}