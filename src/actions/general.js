import { SET_API, SET_SOCKET } from '../constants'
import getWeb3 from '../utils/getWeb3'
import API from '../api'

export const setApi = async () => {
  let api = await getWeb3.then((web3) => {
     return API(web3)
  })
  return {
    type: SET_API,
    api
  }
}

export const setSocket = (api, apiUser) => {
  let socket = new api.Whisper(apiUser)
  socket.start()
  return {
    type: SET_SOCKET,
    socket
  }
}