
import promisify from '../utils/promisify'
import swarm from 'swarm-js'

class Swarm {
  static $inject = ['Web3()', 'SWARM_API_URL']

  constructor(web3, url) {
    if (web3.bzz) {
      this._bzz = web3.bzz
      this._emulated = false
    } else {
      this._bzz = swarm.at(url)
      this._emulated = true
    }
  }

  uploadFilePicker() {
    return this._emulated ? this._bzz.upload({ pick: 'file' }) : promisify(this._bzz, 'upload')({ pick: 'file' })
  }

  upload(fileType, data) {
    const info = {type: fileType, data: data}
    return this._emulated ? this._bzz.uploadFile(info) : promisify(this._bzz, 'uploadFile')(info)
  }

  download(hash) {
    return (this._emulated ? this._bzz.download(hash) : promisify(this._bzz, 'download')(hash))
      .then(folderOrData => {
        // console.log("Folder or Data", folderOrData)
        if (typeof folderOrData.length !== 'undefined')
          return { data: folderOrData, type: 'application/octet-stream' }
        
        const fileInfo = folderOrData.entities[0]
        return this.download(fileInfo.hash)
          .then(data => { return { type: fileInfo.contentType, data: data.data } })
      })
  }
}

 export default Swarm
