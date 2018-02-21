import React from 'react'
import UserPanel from './UserPanel'
import VisibleUsersList from '../containers/VisibleUsersList'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'

export default function Sidebar({user}) {
  return (
    <Paper style={{width: '33%'}}>
      <UserPanel name={user.name} avatar={user.avatar} />
      <VisibleUsersList />
    </Paper>
  )
}

Sidebar.propTypes = {
  user: PropTypes.object
}