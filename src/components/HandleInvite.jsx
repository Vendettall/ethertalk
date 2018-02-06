import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class ModalWindow extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton label="No" primary={true} onClick={this.handleClose} />,
      <FlatButton label="Yes" primary={true} keyboardFocused={true} onClick={this.handleClose} />,
    ];

    return (
      <div>
        <FloatingActionButton mini={true} secondary={true} onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog title="Do you want to chat with this user?" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
        </Dialog>
      </div>
    );
  }
}