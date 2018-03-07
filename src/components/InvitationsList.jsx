import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import {green100, green500, orange100, orange500} from 'material-ui/styles/colors'
import PropTypes from 'prop-types'


const styles = {
  listContainer: {
    height: 'calc(100vh - 152px)',
    overflowY: 'scroll'
  },
  sentInvitation: {
    background: {
      backgroundColor: orange100
    },
    hover: orange500
  },
  inboxInvitation: {
    background: {
      backgroundColor: green100
    },
    hover: green500
  }
}

function InvitationsList({invitationsList, onInvitationClick}) {
  return (
    <List style={styles.listContainer}>
      {invitationsList.map((invitation) =>
        <ListItem
          primaryText={invitation.user.name}
          leftAvatar={<Avatar src={invitation.user.avatar} />}
          hoverColor={invitation.isMy? styles.sentInvitation.hover: styles.inboxInvitation.hover}
          style={invitation.isMy? styles.sentInvitation.background: styles.inboxInvitation.background}
          onClick={() => onInvitationClick(invitation)}
          key={invitation.id}
        />
      )}
    </List>
  )
}

InvitationsList.propTypes = {
  invitationsList: PropTypes.array,
  onListItemClick: PropTypes.func
}


export default InvitationsList