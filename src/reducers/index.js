import { combineReducers } from 'redux'
import searchUserForm from './searchUserForm'
import visibilityFilter from './visibilityFilter'
import invitations from './invitations'
import contacts from './contacts'
import chatView from './chatView'
import messages from './messages'
import currentUser from './currentUser'
import general from './general'
import { routerReducer } from 'react-router-redux'

const chatApp = combineReducers({
  searchUserForm,
  visibilityFilter,
  invitations,
  contacts,
  chatView,
  messages,
  currentUser,
  general,
  routerReducer
})

export default chatApp