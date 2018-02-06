import React from 'react';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import InviteUser from './InviteUser'

function handleClick() {
  alert('onClick triggered on the title component');
}

export default function UserPanel(props) {
  return (
    <AppBar
      title={props.name}
      iconElementRight={<InviteUser />}
      iconElementLeft={<Avatar src={props.avatar} />}
      onRightIconButtonClick={handleClick}
      style={{boxShadow: 'none'}}
    />
  );
}