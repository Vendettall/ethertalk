export default function imageFromHash(api, hash) {
  return api.Swarm.instance().download(hash).then(uint8Array => {
    let decoder = new TextDecoder('utf8')
    let base64String = btoa(decoder.decode(uint8Array))
    return base64String
  })
}