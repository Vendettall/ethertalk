import { REGISTER_USER, CHANGE_ACCOUNT, GET_ACCOUNTS } from '../constants'
import { addInvitation } from '../actions'

export const userMiddleware = store => next => action => {
  // setup handlers
  const setupUserHandler = user => {
    user.on('invitationReceived', apiInvitation => {
      let api = store.getState().general.api
      store.dispatch(addInvitation(api, apiInvitation, false))
    })
  }
  // remove handlers
  const removeUserHandler = user => {
    user.removeListener('invitationReceived', apiInvitation => {
      let api = store.getState().general.api
      store.dispatch(addInvitation(api, apiInvitation, false))
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
  else if (action.type === CHANGE_ACCOUNT && action.account.apiAccount.user)
    onChangeUser(action.account.apiAccount.user)
  else if (action.type === GET_ACCOUNTS && action.startedAccount)
    onChangeUser(action.startedAccount.apiAccount.user)

  return next(action)
}