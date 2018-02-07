export default function visibilityFilter(state = 'SHOW_CONTACTS', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}