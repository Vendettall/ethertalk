export default function general(state = {}, action) {
  switch (action.type) {
    case 'SET_API':
      return Object.assign({}, state, {api: action.api})
    case 'SET_SOCKET':
      return Object.assign({}, state, {socket: action.socket})
    default:
      return state
  }
}