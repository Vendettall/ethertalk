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
  let {type, payload} = action

  const onChangeUser = user => {
    let prevUser = store.getState().user.apiUser
    if (prevUser)
      removeUserHandler(prevUser)
    setupUserHandler(user)
  } 

  if (type === REGISTER_USER)
    onChangeUser(payload.apiUser)
  else if (type === CHANGE_ACCOUNT && payload.account.apiAccount.user)
    onChangeUser(payload.account.apiAccount.user)
  else if (type === GET_ACCOUNTS && payload.startedAccount)
    onChangeUser(payload.startedAccount.apiAccount.user)

  return next(action)
}