import React from 'react'
import UserPanel from './UserPanel';
import UsersList from './UsersList';
import Paper from 'material-ui/Paper'

export default function Sidebar({userInfo, allUsers}) {
  return (
    <Paper style={{width: '33%'}}>
      <UserPanel name={userInfo.name} avatar={userInfo.avatar} />
      <UsersList invites={userInfo.invites} allUsers={allUsers} />
    </Paper>
  );
}