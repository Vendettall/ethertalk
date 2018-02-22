import { connect } from 'react-redux'
import { chooseVisibilityFilter, chooseChatView } from '../actions'
import UsersList from '../components/UsersList'
import { CHAT_VIEWS } from '../constants'

function objectToArray(objectAsMap) {
  return  Object.keys(objectAsMap).reduce((arr, key) => {
    arr.push(objectAsMap[key])
    return arr
  }, [])
}

const mapStateToProps = state => {
  return {
    contacts: objectToArray(state.contacts),
    invitations: objectToArray(state.invitations),
    filter: state.chatView.visibilityFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeFilter: filter => dispatch(chooseVisibilityFilter(filter)),
    onChatWithInterlocutor: contact => dispatch(chooseChatView(CHAT_VIEWS.CHAT_WITH_USER, contact)),
    onProceedInvitation: invitation => {
      if(invitation.isMy) dispatch(chooseChatView(CHAT_VIEWS.SHOW_PENDING_STATE, invitation))
      else dispatch(chooseChatView(CHAT_VIEWS.SHOW_INVITATION, invitation))
    }
  }
}

const VisibleUsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)

export default VisibleUsersList
