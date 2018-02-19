import { connect } from 'react-redux'
import { toggleForm, updateSearchText, searchUser} from '../actions/searchUser'
import { sendInvitation } from '../actions/invitations'
import InviteUser from '../components/InviteUser'

const mapStateToProps = state => {
  return {
    api: state.general.api,
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
    onSearch: (text, api, walletId, invitations, contacts) =>
      dispatch(searchUser(text, api, walletId, invitations, contacts)),
    onInvite: (currentApiUser, apiUser) => dispatch(sendInvitation(currentApiUser, apiUser))
  }
}

const SearchUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteUser)

export default SearchUserForm