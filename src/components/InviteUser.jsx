import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SearchWindow from './SearchWindow'
import ShowFoundUser from './ShowFoundUser'

export default function InviteUser({api, currentUser, invitations, contacts, isOpened, text, stateUser,
                                    apiUser, answer, onToggle, onUpdateText, onSearch, onInvite}) {
  let formAnswer = null
  if(stateUser) {
    formAnswer = <ShowFoundUser currentApiUser={currentUser.apiUser} stateUser={stateUser} 
                                apiUser={apiUser} answer={answer} onInvite={onInvite}/>
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
        <SearchWindow api={api} walletId={currentUser.walletId} invitations={invitations} contacts={contacts}
                      text={text} onUpdateText={onUpdateText} onSearch={onSearch} />
        {formAnswer}
      </Dialog>
    </div>
  )
}