import { SET_API, SET_SOCKET } from '../constants'
import getWeb3 from '../utils/getWeb3'
import API from '../api'

export const setApi = async () => {
  let api = await getWeb3
    .then(web3 => {return API(web3)})

  return {
    type: SET_API,
    payload: {
      api: api
    }
  }
}

export const setSocket = (api, user) => {
  let socket = new api.Whisper(user)
  socket.start()
  
  return {
    type: SET_SOCKET,
    payload: {
      socket: socket
    }
  }
}