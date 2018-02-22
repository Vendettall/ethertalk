import { REGISTER_USER, CHOOSE_ACCOUNT } from '../constants'
import { addInvitation } from '../actions'

export const userMiddleware = store => next => action => {
  // setup handlers
  const setupUserHandler = user => {
    user.on('invitationReceived', apiInvitation => {
      store.dispatch(addInvitation(apiInvitation, false))
    })
  }
  // remove handlers
  const removeUserHandler = user => {
    user.removeListener('invitationReceived', apiInvitation => {
      store.dispatch(addInvitation(apiInvitation, false))
    })
  }
  //
  const onChangeUser = user => {
    let prevUser = store.getState().user.apiUser
    if (prevUser)
      removeUserHandler(prevUser)
    setupUserHandler(user)
  } 

  if (action.type === REGISTER_USER)
    onChangeUser(action.apiUser)
  else if (action.type === CHOOSE_ACCOUNT && action.account.user)
    onChangeUser(action.account.user)

  return next(action)
}