import React from 'react'
import UserPanel from './UserPanel'
import VisibleUsersList from '../containers/VisibleUsersList'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'

const sidebarStyle = {
  width: '33%'
}

export default function Sidebar({user}) {
  return (
    <Paper style={sidebarStyle}>
      <UserPanel name={user.name} avatar={user.avatar} />
      <VisibleUsersList />
    </Paper>
  )
}

Sidebar.propTypes = {
  user: PropTypes.object
}