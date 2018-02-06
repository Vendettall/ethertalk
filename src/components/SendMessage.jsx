import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';
import {red800, grey400} from 'material-ui/styles/colors';

export default class SendMessage extends React.Component {
  render() {
    return (
      <div style={{padding: '0 22px', position: 'relative'}}>
        <TextField hintText="Write a message ..." style={{width: '100%', paddingRight: '24px'}} />
        <IconButton tooltip="Send" style={{position: 'absolute', right: '10px', top: '0'}}>
          <ContentSend color={grey400} hoverColor={red800} />
        </IconButton>
      </div>
    );
  }
}