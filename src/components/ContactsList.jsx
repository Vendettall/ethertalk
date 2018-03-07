import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import PropTypes from 'prop-types'


const styles = {
  listContainer: {
    height: 'calc(100vh - 152px)',
    overflowY: 'scroll'
  }
}

function ContactsList({contactsList, onContactClick}) {
  return (
    <List style={styles.listContainer}>
      {contactsList.map((contact) =>
        <ListItem
          primaryText={contact.name}
          leftAvatar={<Avatar src={contact.avatar} />}
          onClick={() => onContactClick(contact)}
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


export default ContactsList