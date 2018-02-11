import { connect } from 'react-redux'
import { setVisibilityFilter, setChatView } from '../actions'
import { showMessageHistory } from '../actions/messages'
import UsersList from '../components/UsersList'

const getVisibleUsers = (invitations, contacts, filter) => {
  switch (filter) {
    case 'SHOW_INVITED':
      return Object.keys(invitations).reduce((arr, key) => {
        arr.push(invitations[key])
        return arr
      }, [])
    case 'SHOW_CONTACTS':
    default:
      return Object.keys(contacts).reduce((arr, key) => {
        arr.push(contacts[key])
        return arr
      }, [])
  }
}

const mapStateToProps = state => {
  return {
    users: getVisibleUsers(state.invitations, state.contacts, state.visibilityFilter),
    filter: state.visibilityFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => {
      dispatch(setVisibilityFilter(filter))
    },
    chatWithUser: id => {
      dispatch(showMessageHistory(id))
      dispatch(setChatView("CHAT_WITH_USER", id))
    },
    proceedInvitation: (id, isMy) => {
      if(isMy) {
        dispatch(setChatView("SHOW_PENDING_STATE", id))
      } else {
        dispatch(setChatView("SHOW_INVITATION", id))
      }
    }
  }
}

const VisibleUsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)

export default VisibleUsersList
