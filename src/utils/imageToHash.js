const imageToHash = (api, imageAsFile) => {
  return new Promise((res, rej) => {
    let reader = new FileReader()

    reader.onload = function() {
      let uint8Array = new Uint8Array(this.result)
      res(api.Swarm.instance().upload(imageAsFile.type, uint8Array)
        .then(hash => {return hash}))
    }

    reader.readAsArrayBuffer(imageAsFile)
  })
}


export default imageToHash