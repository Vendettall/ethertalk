import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import PropTypes from 'prop-types'

const listContainerStyle = {
  height: 'calc(100vh - 152px)',
  overflowY: 'scroll'
}

export default function ContactsList({contactsList, onListItemClick}) {
  return (
    <List style={listContainerStyle}>
      {contactsList.map((contact) =>
        <ListItem
          primaryText={contact.name}
          leftAvatar={<Avatar src={contact.avatar} />}
          onClick={() => onListItemClick(contact)}
          key={contact.id}
        />
      )}
    </List>
  )
}

ContactsList.propTypes = {
  contactsList: PropTypes.array,
  onListItemClick: PropTypes.func
}