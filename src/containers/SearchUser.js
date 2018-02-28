import React from 'react'
import { connect } from 'react-redux'
import { toggleForm, updateSearchText, searchUser, sendInvitation } from '../actions'
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

function SearchUserView({api, user, invitations, contacts, isOpened, text, stateUser, apiUser,
                         answer, onToggle, onUpdateText, onSearch, onInvite}) {
  let formAnswer = null
  if(stateUser) {
    formAnswer =
      <ShowFoundUser
        currentApiUser={user.apiUser}
        stateUser={stateUser} 
        apiUser={apiUser}
        answer={answer}
        onInvite={onInvite}
      />
  } else if (answer) {
    formAnswer = <div style={styles.fromAnswer}>{answer}</div>
  }

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
          api={api} 
          walletId={user.walletId}
          invitations={invitations}
          contacts={contacts}
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
  api: PropTypes.object,
  user: PropTypes.object,
  invitations: PropTypes.object,
  contacts: PropTypes.object,
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

const SearchUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUserView)

export default SearchUser