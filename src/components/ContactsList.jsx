import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'

export default function UserList({userList, onListItemClick}) {
  return (
    <List style={{height: 'calc(100vh - 152px)', overflowY: 'scroll'}}>
      {userList.map((user) =>
        <ListItem
          primaryText={user.name}
          leftAvatar={<Avatar src={user.avatar} />}
          onClick={() => onListItemClick(user.id)}
          key={user.id}
        />
      )}
    </List>
  )
}