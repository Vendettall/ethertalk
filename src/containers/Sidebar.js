import React from 'react'
import { connect } from 'react-redux'
import UserPanel from '../components/UserPanel'
import UsersList from './UsersList'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'


const sidebarStyle = {
  width: '33%'
}

function SidebarView({user}) {
  return (
    <Paper style={sidebarStyle}>
      <UserPanel name={user.name} avatar={user.avatar} />
      <UsersList />
    </Paper>
  )
}

SidebarView.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const Sidebar = connect(mapStateToProps)(SidebarView)


export default Sidebar