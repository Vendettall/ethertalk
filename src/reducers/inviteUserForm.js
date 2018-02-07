export default function inviteUserForm(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_INVITE_USER_FORM':
      return !action.isOpened
    default:
      return state
  }
}