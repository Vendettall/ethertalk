const users = (state = [], action) => {
  switch (action.type) {
    case 'OPEN_CHAT':
      return action.id
    default:
      return state
  }
}

export default users