const fallback = {
  view: 'SHOW_FALLBACK',
  id: null
}

export default function chatView(state = fallback, action) {
  switch (action.type) {
    case 'SET_CHAT_VIEW':
      return {
        view: action.view,
        id: action.id
      }
    default:
      return state
  }
}