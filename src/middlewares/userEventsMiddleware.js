import { REGISTER_CURRENT_USER, CHOOSE_ACCOUNT } from '../constants'
import { addInvitation } from '../actions'

export const userMiddleware = store => next => action => {
  const setupUserHandler = user => {
    user.on('invitationReceived', apiInvitation => {
      store.dispatch(addInvitation(apiInvitation, false))
    })
  }

  const removeUserHandler = user => {
    user.removeListener('invitationReceived', apiInvitation => {
      store.dispatch(addInvitation(apiInvitation, false))
    })
  }

  if (action.type === REGISTER_CURRENT_USER) {
    let prevUser = store.getState().currentUser.apiUser
    if (prevUser)
      removeUserHandler(prevUser)
    setupUserHandler(action.apiUser)
  }
  else if (action.type === CHOOSE_ACCOUNT && action.hasUser) {
    let prevUser = store.getState().currentUser.apiUser
    if (prevUser)
      removeUserHandler(prevUser)
    setupUserHandler(action.account.user)
  }

  return next(action)
}