import React from 'react'
import { connect } from 'react-redux'
import { toggleForm, updateSearchText, searchUserRequest, sendInvitationRequest } from '../actions'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SearchForm from '../components/SearchForm'
import ShowFoundUser from '../components/ShowFoundUser'
import PropTypes from 'prop-types'

const styles = {
  fromAnswer: {
    textAlign: 'center',
    marginTop: '40px'
  }
}

function SearchUserView({isOpened, text, stateUser, apiUser, answer, onToggle, onUpdateText, onSearch, onInvite}) {
  let formAnswer = null

  if (stateUser) // if we got user in response
    formAnswer =
      <ShowFoundUser
        stateUser={stateUser} 
        apiUser={apiUser}
        answer={answer}
        onInvite={onInvite}
      />
  else if (answer) // if we got answer in response
    formAnswer = 
      <div style={styles.fromAnswer}>{answer}</div>

  return (
    <div>
      <FloatingActionButton mini={true} secondary={true} onClick={() => onToggle(isOpened)}>
        <ContentAdd />
      </FloatingActionButton>
      <Dialog 
        title="Search user" 
        actions={[<FlatButton label="Cancel" primary={true} onClick={() => onToggle(isOpened)} />]} 
        modal={false}
        open={isOpened}
        onRequestClose={() => onToggle(isOpened)}
      >
        <SearchForm
          text={text}
          onUpdateText={onUpdateText}
          onSearch={onSearch}
        />
        {formAnswer}
      </Dialog>
    </div>
  )
}

SearchUserView.propTypes = {
  isOpened: PropTypes.bool,
  text: PropTypes.string,
  stateUser: PropTypes.object,
  apiUser: PropTypes.object,
  answer: PropTypes.string,
  onToggle: PropTypes.func,
  onUpdateText: PropTypes.func,
  onSearch: PropTypes.func,
  onInvite: PropTypes.func
}

const mapStateToProps = state => {
  return {
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
    onSearch: (text) => dispatch(searchUserRequest(text)),
    onInvite: (apiUser) => dispatch(sendInvitationRequest(apiUser))
  }
}

const SearchUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUserView)

export default SearchUser