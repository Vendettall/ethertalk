import React from 'react'
import Avatar from 'material-ui/Avatar'
import AppBar from 'material-ui/AppBar'
import ToggleUserForm from '../containers/ToggleUserForm'

export default function UserPanel({name, avatar}) {
  return (
    <AppBar
      title={name}
      iconElementRight={<ToggleUserForm />}
      iconElementLeft={<Avatar src={avatar} />}
      style={{boxShadow: 'none'}}
    />
  )
}