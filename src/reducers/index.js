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
import notifications from './notifications'
import channels from './channels'
import { configurablePendingTasksReducer } from 'react-redux-spinner'

const pendingTasksReducer = configurablePendingTasksReducer({ actionKeyPath: [ 'meta' ] })

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
  accounts,
  notifications,
  channels,
  pendingTasks: pendingTasksReducer
})

export default chatApp