export const setApi = api => {
  return {
    type: 'SET_API',
    api
  }
}

export const updateCurrentUser = user => {
  return {
    type: 'UPDATE_CURRENT_USER',
    user
  }
}