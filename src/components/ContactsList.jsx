import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'

export default function UserList({contactsList, onListItemClick}) {
  return (
    <List style={{height: 'calc(100vh - 152px)', overflowY: 'scroll'}}>
      {contactsList.map((contact) =>
        <ListItem
          primaryText={contact.name}
          leftAvatar={<Avatar src={contact.avatar} />}
          onClick={() => onListItemClick(contact.id)}
          key={contact.id}
        />
      )}
    </List>
  )
}