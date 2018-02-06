import React from 'react';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import InviteUser from './InviteUser'

export default function UserPanel({name, avatar}) {
  return (
    <AppBar
      title={name}
      iconElementRight={<InviteUser />}
      iconElementLeft={<Avatar src={avatar} />}
      style={{boxShadow: 'none'}}
    />
  );
}