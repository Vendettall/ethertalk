import { combineReducers } from 'redux'
import inviteUserForm from './inviteUserForm'
import visibilityFilter from './visibilityFilter'
import invitations from './invitations'
import contacts from './contacts'
import chatView from './chatView'
import messages from './messages'

const chatApp = combineReducers({
  inviteUserForm,
  visibilityFilter,
  invitations,
  contacts,
  chatView,
  messages
})

export default chatApp