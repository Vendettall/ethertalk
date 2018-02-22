import { combineReducers } from 'redux'
import searchUser from './searchUser'
import invitations from './invitations'
import contacts from './contacts'
import chatView from './chatView'
import messages from './messages'
import user from './user'
import general from './general'
import pubKeys from './pubKeys'
import { routerReducer } from 'react-router-redux'
import registerUser from './registerUser'
import accounts from './accounts'

const chatApp = combineReducers({
  searchUser,
  invitations,
  contacts,
  chatView,
  messages,
  user,
  general,
  pubKeys,
  routerReducer,
  registerUser,
  accounts
})

export default chatApp