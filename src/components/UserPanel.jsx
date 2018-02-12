import React from 'react'
import Avatar from 'material-ui/Avatar'
import AppBar from 'material-ui/AppBar'
import SearchUserForm from '../containers/SearchUserForm'

export default function UserPanel({name, avatar}) {
  return (
    <AppBar
      title={name}
      iconElementRight={<SearchUserForm />}
      iconElementLeft={<Avatar src={avatar} />}
      style={{boxShadow: 'none'}}
    />
  )
}