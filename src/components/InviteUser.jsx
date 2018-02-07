import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import SearchUser from './SearchUser'

export default function InviteUser({isOpened, onToggle}) {
  const actions = [
    <FlatButton label="Cancel" primary={true} onClick={() => onToggle(isOpened)} />,
    // <FlatButton label="Search" primary={true} keyboardFocused={true} onClick={this.handleClose} />,
  ]

  return (
    <div>
      <FloatingActionButton mini={true} secondary={true} onClick={() => onToggle(isOpened)}>
        <ContentAdd />
      </FloatingActionButton>
      <Dialog title="Search user" actions={actions} modal={false} open={isOpened} onRequestClose={() => onToggle(isOpened)}>
        <SearchUser />
      </Dialog>
    </div>
  )
}