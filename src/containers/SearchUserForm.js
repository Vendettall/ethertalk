import { connect } from 'react-redux'
import { toggleForm, updateSearchText, responseStateUser, responseApiUser, responseAnswer,
         wipePreviousResponse } from '../actions/searchUser'
import InviteUser from '../components/InviteUser'
import convertToStateUser from '../utils/convertToStateUser'

function proceedInInvitations(invitations, userId, dispatch) {
  let isFound = false
  Object.keys(invitations).forEach(invKey => {
    if (invitations[invKey].user.id === userId) {
      if (invitations[invKey].isMy === true) dispatch(responseAnswer('You have already invited this user.'))
      else dispatch(responseAnswer('This user has already invited you.'))    
      dispatch(responseStateUser(invitations[invKey].user))
      isFound = true
      return
    }
  })
  return isFound
}

function poceedInContacts(contacts, userId, dispatch) {
  if (contacts.hasOwnProperty(userId)) {
    dispatch(responseAnswer('This user has already in your contacts.'))
    dispatch(responseStateUser(contacts[userId]))
    return true
  }
  return false
}

function searchUser(general, currentUser, invitations, contacts, text, prevAnswer, dispatch) {
  if(prevAnswer) dispatch(wipePreviousResponse())
  if (text === currentUser.walletId) {
    dispatch(responseAnswer('It is you.'))
    return
  }
  general.api.UserRegistry.instance().getUser(text).then(user => {
    if (!user) dispatch(responseAnswer('User not found.'))
    else if (proceedInInvitations(invitations, user.id, dispatch)) {} 
    else if (poceedInContacts(contacts, user.id, dispatch)) {} 
    else {
      dispatch(responseStateUser(convertToStateUser(user)))
      dispatch(responseAnswer('You can invite this user.'))
      dispatch(responseApiUser(user))
    }
    return 
  })
}

function inviteUser(currentUser, apiUser, dispatch) {
  currentUser.apiUser.invite(apiUser).then(response => {
    if(response) {
      dispatch(responseAnswer('Invitation was sent.'))
    } else {
      dispatch(responseAnswer('An error occured.'))
    }
    return
  })
}

const mapStateToProps = state => {
  return {
    general: state.general,
    currentUser: state.currentUser,
    invitations: state.invitations,
    contacts: state.contacts,
    isOpened: state.searchUserForm.isOpened,
    text: state.searchUserForm.text,
    stateUser: state.searchUserForm.response.stateUser,
    apiUser: state.searchUserForm.response.apiUser,
    answer: state.searchUserForm.response.answer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggle: isOpened => dispatch(toggleForm(isOpened)),
    onUpdateText: text => dispatch(updateSearchText(text)),
    onSearch: (general, currentUser, invitations, contacts, text, answer) =>
      searchUser(general, currentUser, invitations, contacts, text, answer, dispatch),
    onInvite: (currentUser, apiUser) => inviteUser(currentUser, apiUser, dispatch)
  }
}

const SearchUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteUser)

export default SearchUserForm