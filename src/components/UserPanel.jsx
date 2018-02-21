import React from 'react'
import Avatar from 'material-ui/Avatar'
import AppBar from 'material-ui/AppBar'
import SearchUserForm from '../containers/SearchUserForm'
import ShowAccounts from '../containers/ShowAccounts'
import PropTypes from 'prop-types'

export default function UserPanel({name, avatar}) {
  return (
    <AppBar
      title={<ShowAccounts />}
      iconElementRight={<SearchUserForm />}
      iconElementLeft={<Avatar src={avatar} />}
      style={{boxShadow: 'none'}}
    />
  )
}

UserPanel.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string
}