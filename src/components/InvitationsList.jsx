import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import {green100, green500, orange100, orange500} from 'material-ui/styles/colors'

export default function UserList({userList, onListItemClick}) {
  return (
    <List style={{height: 'calc(100vh - 152px)', overflowY: 'scroll'}}>
      {userList.map((user) =>
        <ListItem
          primaryText={user.name}
          leftAvatar={<Avatar src={user.avatar} />}
          hoverColor={user.isMy? green500: orange500}
          style={user.isMy? {backgroundColor: orange100}: {backgroundColor: green100}}
          onClick={() => onListItemClick(user.id, user.isMy)}
          key={user.id}
        />
      )}
    </List>
  )
}