import React from 'react'
import UserPanel from './UserPanel'
import VisibleUsersList from '../containers/VisibleUsersList'
import Paper from 'material-ui/Paper'

export default function Sidebar({userInfo}) {
  return (
    <Paper style={{width: '33%'}}>
      <UserPanel name={userInfo.name} avatar={userInfo.avatar} />
      <VisibleUsersList />
    </Paper>
  )
}