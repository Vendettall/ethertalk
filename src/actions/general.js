export const setApi = api => {
  return {
    type: 'SET_API',
    api
  }
}

export const setSocket = socket => {
  return {
    type: 'SET_SOCKET',
    socket
  }
}