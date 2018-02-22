import { connect } from 'react-redux'
import { toggleForm, updateSearchText, searchUser, sendInvitation } from '../actions'
import SearchUserView from '../components/SearchUserView'

const mapStateToProps = state => {
  return {
    api: state.general.api,
    user: state.user,
    invitations: state.invitations,
    contacts: state.contacts,
    isOpened: state.searchUser.isOpened,
    text: state.searchUser.text,
    stateUser: state.searchUser.response.stateUser,
    apiUser: state.searchUser.response.apiUser,
    answer: state.searchUser.response.answer
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
)(SearchUserView)

export default SearchUserForm