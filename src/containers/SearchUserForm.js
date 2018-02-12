import { connect } from 'react-redux'
import { toggleForm, updateSearchText, responseStateUser, responseApiUser, responseAnswer,
         wipePreviousResponse } from '../actions/searchUser'
import InviteUser from '../components/InviteUser'
import convertToStateUser from '../utils/convertToStateUser'

function checkInInboxInvitations(general, userId) {
  return general.user.getInboxInvitations().then(invitations => {
    return invitations.find(invitation => invitation.user.id === userId)
  })
}

function checkInSentInvitations(general, userId) {
  return general.user.getSentInvitations().then(invitations => {
    return invitations.find(invitation => invitation.user.id === userId)
  })
}

function checkInContacts(general, userId) {
  return general.user.getContacts().then(contacts => {
    return contacts.find(contact => contact.id === userId)
  })
}

function searchUser(general, text, prevAnswer, dispatch) {
  if(prevAnswer) dispatch(wipePreviousResponse())
  if (text === general.walletId) {
    dispatch(responseAnswer('It is you.'))
    return
  }
  general.api.UserRegistry.instance().getUser(text).then(user => {
    if (!user) {
      dispatch(responseAnswer('User not found.'))
      return
    } else {
      dispatch(responseStateUser(convertToStateUser(user)))
    }
    Promise.all([checkInInboxInvitations(general, user.id),
      checkInSentInvitations(general, user.id), checkInContacts(general, user.id)])
      .then((isInInboxInv, isInSentInv, isInContacts) => {
        if(isInInboxInv) dispatch(responseAnswer('This user has already invited you.'))
        else if (isInSentInv) dispatch(responseAnswer('You have already invited this user.'))
        else if (isInContacts) dispatch(responseAnswer('This user has already in your contacts.'))
        else {
          dispatch(responseAnswer('You can invite this user.'))
          dispatch(responseApiUser(user))
        }
        return 
      })
  })
}

function inviteUser(general, apiUser, dispatch) {
  // general.api.UserRegistry.instance().getUser('0x295370683493e415c8a42d45d19f0d3240eb85b0').then(user=>{
  //   console.log(user)
  //   general.user.invite(user).then(response => {
  //     console.log(response)
  //   })
  // })
  general.user.invite(apiUser).then(response => {
    if(response) {
      dispatch(responseAnswer('Invitation was sent.'))
    } else {
      dispatch(responseAnswer('An error occured.'))
    }
    return
  })
}

const mapStateToProps = state => {
  console.log(state.searchUserForm.response)
  return {
    general: state.general,
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
    onSearch: (general, text, answer) => searchUser(general, text, answer, dispatch),
    onInvite: (general, apiUser) => inviteUser(general, apiUser, dispatch)
  }
}

const SearchUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteUser)

export default SearchUserForm