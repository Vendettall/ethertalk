import { connect } from 'react-redux'
import { setVisibilityFilter, setChatView } from '../actions'
import UsersList from '../components/UsersList'

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
    filter: state.visibilityFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => {
      dispatch(setVisibilityFilter(filter))
    },
    chatWithUser: id => dispatch(setChatView("CHAT_WITH_USER", id)),
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
