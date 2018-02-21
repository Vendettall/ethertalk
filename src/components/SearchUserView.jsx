import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SearchWindow from './SearchWindow'
import ShowFoundUser from './ShowFoundUser'
import PropTypes from 'prop-types'

export default function SearchUserView({api, currentUser, invitations, contacts, isOpened, text, stateUser,
                                    apiUser, answer, onToggle, onUpdateText, onSearch, onInvite}) {
  let formAnswer = null
  if(stateUser) {
    formAnswer =
      <ShowFoundUser
        currentApiUser={currentUser.apiUser}
        stateUser={stateUser} 
        apiUser={apiUser}
        answer={answer}
        onInvite={onInvite}
      />
  } else if (answer) {
    formAnswer = <div style={{textAlign: 'center', marginTop: '40px'}}>{answer}</div>
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
        <SearchWindow
          api={api} 
          walletId={currentUser.walletId}
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
  currentUser: PropTypes.object,
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