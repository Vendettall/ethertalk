import React from 'react'
import UserPanel from './UserPanel';
import UsersList from './UsersList';
import Paper from 'material-ui/Paper'

export default function Sidebar(props) {
  return (
    <Paper style={{width: '33%'}}>
      <UserPanel name={props.userInfo.name} avatar={props.userInfo.avatar} />
      <UsersList invites={props.userInfo.invites} allUsers={props.allUsers} />
    </Paper>
  );
}