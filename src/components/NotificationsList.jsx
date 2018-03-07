import React from 'react'
import {List, ListItem} from 'material-ui/List'
import PropTypes from 'prop-types'


const styles = {
  list: {
    width: '100%',
    textAlign: 'center'
  }
}

function NotificationList({notifications}) {
  return (
    <List style={styles.list}>
      {notifications.map(notification =>
        <ListItem
          primaryText={notification.text}
          key={notification.id}
        />
      )}
    </List>
  )
}

NotificationList.propTypes = {
  notifications: PropTypes.array
}


export default NotificationList